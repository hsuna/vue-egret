/*
* vue-egret 1.0.0
* @author Hsuna
*/
/// <reference path="../types/egret.d.ts" />
/// <reference path="../types/tween.d.ts" />

import Render from './render';
import Watcher from './observer/watcher'
import { observe } from './observer/index'
import { pushTarget, popTarget } from './observer/dep'
import { noop, isPlainObject } from './util/index'
import { validateProp } from './util/props'

export interface ComponentClass {
    options:ComponentOptions;
    new (sp:egret.DisplayObjectContainer, parentOptions:ComponentParentOptions);
}
export interface ComponentMap<T> {
    [propName:string]: T;
}

export interface ComponentParentOptions {
    parent?: Component;
    propsData?: ComponentMap<any>;
    _propsKeys?: Array<string>;
}

export interface ComponentOptions{
    template?: string;
    data?: Function | Object;
    props?: ComponentMap<any>;
    computed?: ComponentMap<Function>;
    watch?: ComponentMap<Function>;
    components?: ComponentMap<ComponentOptions>;
    methods?: ComponentMap<Function>;
    beforeCreate?: Function;
    created?: Function;
    beforeMounted?: Function;
    mounted?: Function;
    beforeDestroyed?: Function;
    destroyed?: Function;
    _parentOptions?: ComponentParentOptions;
}

/** 类型-注册信息 */
export type ComponentRef = String | Component | egret.DisplayObject

export class ComponentEvent extends egret.Event {
    public data:any;
    constructor(type:string, data:any, bubbles:boolean=false, cancelable:boolean = false) {
        super(type, bubbles, cancelable);
        this.data = data;
    }
}

export class Component {
    $el: egret.DisplayObject;
    parentOptions: ComponentParentOptions;
    options: ComponentOptions;

    // private __tickHandler: ComponentMap<Function> = [];
    private __global: any={};
    private __data: any={};
    private __props: any={};
    private __render: Render;
    private __watcher: Watcher;
    private __watchers: Array<Watcher> = [];
    private __components: ComponentMap<ComponentClass> = {};
    private __nextTickCall: Array<Function> = [];
    public __refs: ComponentMap<egret.DisplayObject|Component> = {};

    constructor($el:egret.DisplayObject, options:ComponentOptions={}, parentOptions: ComponentParentOptions={}) {
        this.$el = $el;
        this.options = options;
        this.parentOptions = parentOptions;
        this._init()
    }

    public _init() {
        this._initMethods(this.options.methods)
        this._initGlobal()
        this._initData(this.options.data)
        this._initProps(this.options.props, this.parentOptions.propsData)
        this._initComputed(this.options.computed);
        this.$callHook('beforeCreate');
        this._initWatch(this.options.watch)
        this._initComponents(this.options.components)
        this.$callHook('created');
        this.$callHook('beforeMounted');
        this.__render = new Render(this)
        this.__watcher = new Watcher(this, () => {
            if(!this.__render) return; // 反正渲染器销毁时，进程依然回调方法
            this.$callHook('beforeUpdate')
            this.__render.update()
            this.$callHook('update')
        }, noop)
        setTimeout(() => {
            this.__global.stage = this.$el.stage
            this.$callHook('mounted')
        }, 1)
    }
    /** 初始化全局参数，用于全局方便获取 */
    private _initGlobal(){
        this.__global = {
            stage: this.$el.stage || new egret.Stage()
        }
        // 监听数据
        observe(this.__global)
    }
    private _initProps(propsOptions: any={}, propsData:any={}) {
        for(const key in propsOptions){
            this.__props[key] = propsData.hasOwnProperty(key) ? propsData[key] : validateProp(propsOptions[key], this)
            Object.defineProperty(this, key, {
                get(){
                    return this.__props[key]
                }
            })
        }
        // 监听数据
        observe(this.__props)
    }
    private _initData(data: any) {
        this.__data = typeof data === 'function'? this._getData(data) : data || {};
        for(const key in this.__data){
            Object.defineProperty(this, key, {
                get(){
                    return this.__data[key]
                },
                set(val){
                    this.__data[key] = val
                }
            })
        }
        // 监听数据
        observe(this.__data)
    }
    private _initMethods(methods:any = {}) {
        // 将methods上的方法赋值到vm实例上
        for(const e in methods){
            this[e] = methods[e]
        }
    }
    private _initComputed(computed:any={}) {
        for(const key in computed){
            const userDef:any = computed[key] || noop
            const getter:Function = typeof userDef === 'function' ? userDef : userDef.get
            Object.defineProperty(this, key, {
                get(){
                    return getter.call(this);
                }
            })
        }
    }
    private _initWatch (watch: Object={}) {
        for(const key in watch){
            const handler = watch[key]
            if (Array.isArray(handler)) {
                handler.forEach(h => this._createWatcher(key, h))
            } else {
                this._createWatcher(key, handler)
            }
        }
    }
    private _initComponents(components:ComponentMap<ComponentOptions> = {}){
        for(const name in components){
            this.__components[name] = VueEgret.classFactory(components[name])
        }
    }
    private _getData (data: Function): any {
        pushTarget()
        try {
            return data.call(this, this)
        } catch (e) {
            return {}
        } finally {
            popTarget()
        }
    }
    private _createWatcher (expOrFn: string | Function, handler: any, options?: Object) {
        if (isPlainObject(handler)) {
          options = handler
          handler = handler.handler
        }
        if (typeof handler === 'string') {
          handler = this[handler]
        }
        return this.$watch(expOrFn, handler, options)
    }
    public _$tick () {
        while(this.__nextTickCall.length>0){
            let callback:Function = this.__nextTickCall.shift()
            if('function' === typeof callback) callback()
        }
    }
    public $emit (event: string, data:any): Component {
        this.$el.dispatchEvent(new ComponentEvent(event, data));
        return this;
    }
    public $watch (expOrFn: string | Function, cb: any, options?: Object): Function {
        if (isPlainObject(cb)) {
          return this._createWatcher(expOrFn, cb, options)
        }
        options = options || {}
        const watcher = new Watcher(this, expOrFn, cb)
        return function unwatchFn () {
            watcher.teardown()
        }
    }
    public $callHook(name:string, ...rest) {
        // 阻断所有数据变动
        pushTarget()
        if('function' === typeof this.options[name]){
            this.options[name].call(this, ...rest)
        }
        popTarget()
    }
    /**
     * 销毁
     * @description 销毁对象
     * @author Hsuna
     */
    public $destroy(){
        // 销毁观察器
        this.__watcher.teardown()
        this.__watcher = null
        this.__watchers = null;
        // 销毁渲染器
        this.__render.destroy()
        this.__render = null
        this.$callHook('destroyed')
    }
    public $nextTick(callback:Function) {
        this.__nextTickCall.push(callback)
    }
    public $displayObject(ref:ComponentRef):egret.DisplayObject {
        if('string' === typeof ref){
            return this.$displayObject(this.__refs[ref])
        }else if(ref instanceof Component){
            return(ref as Component).$el
        }else if(ref instanceof egret.DisplayObject){
            return ref as egret.DisplayObject
        }
        return null;
    }
    /**
     * 碰撞检测
     * @description 用于检测两个显示对象间是否存在碰撞
     * @author Hsuna
     * @param { ComponentRef } ref1 显示对象1
     * @param { ComponentRef } ref2 显示对象2
     * @return { boolean }
     */
    public $hitTest(ref1:ComponentRef, ref2:ComponentRef): boolean {
        const disObj1: egret.DisplayObject = this.$displayObject(ref1)
        const disObj2: egret.DisplayObject = this.$displayObject(ref2)
        if(!disObj1 || !disObj2) return true
        let rect1: egret.Rectangle = disObj1.getBounds()
        let rect2: egret.Rectangle = disObj2.getBounds()
        rect1.x = disObj1.x, rect1.y = disObj1.y; 
        rect2.x = disObj2.x, rect2.y = disObj2.y; 
        return rect1.intersects(rect2)
    }
    public $hitTestPoint(ref:ComponentRef, x:number, y:number, shapeFlag?: boolean): boolean {
        const disObj: egret.DisplayObject = this.$displayObject(ref)
        return disObj ? disObj.hitTestPoint(x, y, shapeFlag) : false
    }
    public $globalToLocal(ref:ComponentRef, stateX:number, stateY:number): egret.Point {
        const disObj: egret.DisplayObject = this.$displayObject(ref)
        const resultPoint: egret.Point = new egret.Point(stateX, stateY)
        disObj && disObj.globalToLocal(stateX, stateY, resultPoint)
        return resultPoint
    }
    public $localToGlobal(ref:ComponentRef, stateX:number, stateY:number): egret.Point {
        const disObj: egret.DisplayObject = this.$displayObject(ref)
        const resultPoint: egret.Point = new egret.Point(stateX, stateY)
        disObj && disObj.localToGlobal(stateX, stateY, resultPoint)
        return resultPoint
    }
    /**
     * 获取Tween对象
     * @description 用于检测egret.Tween是否被安装，且空值时，返回this的Tween
     * @author Hsuna
     * @param {egret.Tween} tween 可选，若不为Tween类型，则返回egret.Tween.get(this, ...arguments)
     * @return {egret.Tween} 
     */
    public $tween(tween?:egret.Tween): egret.Tween{
        if('Tween' in egret) return (tween instanceof egret.Tween) ? tween : egret.Tween.get(this, ...arguments)
        else throw 'The egret.Tween.js not import!!!'
    }
    /**
     * 简单运动动画
     * @description 仅适用于to函数，复杂的动画效果请使用原egret.Tween结合$tweenPromise实现
     * @author Hsuna
     * @param { any } props 对象的属性集合
     * @param { number } duration 持续时间
     * @param { Function } ease 缓动算法
     * @return {Promise<egret.Tween>}
     */
    public $tweenTo(props: any, duration?: number, ease?: Function): Promise<egret.Tween> {
        return this.$tweenPromise(this.$tween().to(props, duration, ease))
    }
    /**
     * 简单等待动画
     * @description 仅适用于wait函数，复杂的动画效果请使用原egret.Tween结合$tweenPromise实现
     * @author Hsuna
     * @param { number } duration 持续时间
     * @param { boolean } passive 等待期间属性是否会更新
     * @return {Promise<egret.Tween>}
     */
    public $tweenWait(duration: number, passive?: boolean): Promise<egret.Tween> {
        return this.$tweenPromise(this.$tween().wait(duration, passive))
    }
    /**
     * 动画Promise包装
     * @description 将Tween.call包装为Promise的方式
     * @author Hsuna
     * @param {egret.Tween} tween 
     * @return {Promise<egret.Tween>}
     */
    public $tweenPromise(tween: egret.Tween): Promise<egret.Tween> {
        return new Promise((resolve:(value:egret.Tween) => void) => tween.call(resolve))
    }
    public get $refs():ComponentMap<egret.DisplayObject|Component> {
        return this.__refs;
    }
    public get $stage():egret.Stage {
        return this.__global.stage
    }
    public get _data():any {
        return this.__data;
    }
    public set _props(val:any) {
        this.__props = val;
    }
    public get _props():any {
        return this.__props;
    }
    public get _render():Render{
        return this.__render;
    }
    public get _watcher():Watcher{
        return this.__watcher;
    }
    public get _watchers():Array<Watcher>{
        return this.__watchers;
    }
    public get _components():ComponentMap<ComponentClass>{
        return this.__components;
    }
}

export default class VueEgret extends Component {
    static _components:ComponentMap<ComponentClass> = {}
    static component = (name:string, options:ComponentOptions) => {
        VueEgret._components[name] = VueEgret.classFactory(options)
    }
    static classFactory = (options:ComponentOptions):ComponentClass => class extends Component {
        static options:ComponentOptions = options; 
        constructor(sp:egret.DisplayObjectContainer, parentOptions: ComponentParentOptions={}) {
            super(sp, options, parentOptions)
        }
    }
    static classMain = (options:ComponentOptions):any => class extends egret.DisplayObjectContainer {
        constructor(){
            super()
            new Component(this, options)
        }
    }
    constructor(options:ComponentOptions) {
        super(new egret.DisplayObjectContainer, options)
    }
}