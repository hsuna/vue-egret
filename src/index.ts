/*
* vue-egret 1.2.2
* @author Hsuna
*/
/// <reference path="../types/egret.d.ts" />
/// <reference path="../types/tween.d.ts" />

import Render from './render';
import { VNode } from "./render/v-node";
import Watcher from './observer/watcher'
import { observe } from './observer/index'
import { pushTarget, popTarget } from './observer/dep'
import { noop, isPlainObject } from './util/index'
import { validateProp, normalizeProp } from './util/props'

export interface ComponentClass {
    options:ComponentOptions;
    new (parentOptions?:ComponentParentOptions);
}
export interface ComponentParentOptions {
    parent?: Component;
    propsData?: Record<string, PropData|Function>;
    _propsKeys?: Array<string>;
}

export interface PropData {
    type: Function;
    default?: any;
    required?: boolean;
    validator?: Function;
}

export interface ComponentOptions {
    template: string;
    data: Function | Object;
    props: Array<string>|Record<string, PropData|Function>;
    computed: Record<string, Function>;
    watch: Record<string, Function>;
    components: Record<string, ComponentOptions>;
    methods: Record<string, Function>;
    beforeCreate: Function;
    created: Function;
    beforeMounted: Function;
    mounted: Function;
    beforeDestroyed: Function;
    destroyed: Function;
    render: (createVNode:(tag:string, key:string|number, data:any, children:Array<VNode>) => VNode) => VNode;
    _parentOptions: ComponentParentOptions;
}

/** 类型-注册信息 */
export type ComponentRef = String | Component | egret.DisplayObject

/** 组件矩形 */
export interface ComponentRect {
    x: number,
    y: number,
    width: number,
    height: number
}

export class ComponentEvent extends egret.Event {
    public data:any;
    constructor(type:string, data:any, bubbles:boolean=false, cancelable:boolean = false) {
        super(type, bubbles, cancelable);
        this.data = data;
    }
}

/**
 * 组件类
 * @author Hsuna
 * @param { ComponentOptions } options 组件配置
 * @param { ComponentParentOptions } parentOptions 继承配置
 */
export class Component {
    /** 显示对象 */
    $el: egret.DisplayObject;
    parentOptions: ComponentParentOptions;
    options: ComponentOptions;

    // private __tickHandler: ComponentMap<Function> = [];
    private __global: Record<string, any>={};
    private __data: Record<string, any>={};
    private __props: Record<string, Array<string>|Record<string, PropData|Function>>={};
    private __render: Render;
    private __watcher: Watcher;
    private __watchers: Array<Watcher> = [];
    private __components: Record<string, ComponentClass> = {};
    private __nextTickCall: Array<Function> = [];
    public __refs: Record<string, egret.DisplayObject|Component> = {};

    constructor(options:ComponentOptions=<any>{}, parentOptions: ComponentParentOptions={}) {
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
            stage: new egret.Stage()
        }
        // 监听数据
        observe(this.__global)
    }
    private _initProps(propsOptions: Array<string>|Record<string, PropData|Function>={}, propsData:Record<string, PropData|Function>={}) {
        let props:Record<string, PropData> = normalizeProp(propsOptions) // normalizeProp
        for(const key in props){
            this.__props[key] = propsData.hasOwnProperty(key) ? propsData[key] : validateProp(props[key], this);
            Object.defineProperty(this, key, {
                get(){
                    return this.__props[key]
                },
                set(val){
                    console.error('The props data not set!')
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
    private _initMethods(methods:Record<string, Function> = {}) {
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
    private _initWatch (watch: Record<string, any>={}) {
        for(const key in watch){
            const handler = watch[key]
            if (Array.isArray(handler)) {
                handler.forEach(h => this._createWatcher(key, h))
            } else {
                this._createWatcher(key, handler)
            }
        }
    }
    private _initComponents(components:Record<string, ComponentOptions> = {}){
        for(const name in components){
            this.__components[name] = VueEgret.extend(components[name])
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
        this.$el && this.$el.dispatchEvent(new ComponentEvent(event, data));
        return this;
    }
    /**
     * 
     * @param expOrFn 
     * @param cb 
     * @param options 
     */
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
    public $nextTick(callback:Function) {
        this.__nextTickCall.push(callback)
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
    /**
     * 通过挂载名或者组件，获取实际的显示对象
     * @param { ComponentRef } ref 显示对象名
     * @return { egret.DisplayObject }
     */
    public $displayObject(ref:ComponentRef):egret.DisplayObject {
        if('string' === typeof ref){// 挂载名
            return this.$displayObject(this.__refs[ref])
        }else if(ref instanceof Component){// 组件
            return(ref as Component).$el
        }else if(ref instanceof egret.DisplayObject){// 显示对象本身
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
    /**
     * 矩形碰撞检测
     * @description 用于检测两个矩形对象间是否存在碰撞
     * @author Hsuna
     * @param { ComponentRect } rect1 矩形对象1
     * @param { ComponentRect } rect2 矩形对象2
     * @return { boolean }
     */
    public $hitTestRect(rect1:ComponentRect, rect2:ComponentRect): boolean {
        if(!rect1 || !rect2) return true
        rect1 = rect1 instanceof egret.Rectangle ? rect1 :  new egret.Rectangle(rect1.x, rect1.y, rect1.width, rect1.height)
        rect2 = rect2 instanceof egret.Rectangle ? rect2 :  new egret.Rectangle(rect2.x, rect2.y, rect2.width, rect2.height)
        return (rect1 as egret.Rectangle).intersects(rect2 as egret.Rectangle)
    }
    /**
     * 坐标点碰撞检测
     * @description 用于检测坐标点是否在对象内
     * @author Hsuna
     * @param { ComponentRef } ref 显示对象
     * @param { number } x 坐标X 
     * @param { number } y 坐标Y
     * @param { boolean } shapeFlag 是否采用像素值检测
     * @return { boolean }
     */
    public $hitTestPoint(ref:ComponentRef, x:number, y:number, shapeFlag?: boolean): boolean {
        const disObj: egret.DisplayObject = this.$displayObject(ref)
        return disObj ? disObj.hitTestPoint(x, y, shapeFlag) : false
    }
    /**
     * 将全局坐标转化为本地坐标
     * @param { ComponentRef } ref 显示对象
     * @param { number } stateX  全局坐标X
     * @param { number } stateY  全局坐标Y
     * @return { egret.Point } 本地坐标
     */
    public $globalToLocal(ref:ComponentRef, stateX:number, stateY:number): egret.Point {
        const disObj: egret.DisplayObject = this.$displayObject(ref)
        const resultPoint: egret.Point = new egret.Point(stateX, stateY)
        disObj && disObj.globalToLocal(stateX, stateY, resultPoint)
        return resultPoint
    }
    /**
     * 将本地坐标转化为全局坐标
     * @param { ComponentRef } ref 显示对象
     * @param { number } stateX  本地坐标X
     * @param { number } stateY  本地坐标Y
     * @return { egret.Point } 全局坐标
     */
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
    /**
     * 获取注册列表
     */
    public get $refs():Record<string, egret.DisplayObject|Component> {
        return this.__refs;
    }
    /**
     * 获取舞台信息
     * @return { egret.Stage }
     */
    public get $stage():egret.Stage {
        return this.__global.stage
    }
    /**
     * 获取舞台宽度
     * @return { number }
     */
    public get $stageWidth():number {
        return this.__global.stage.width
    }
    /**
     * 获取舞台高度
     * @return { number }
     */
    public get $stageHeight():number {
        return this.__global.stage.height
    }
    public get $data():Record<string, any> {
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
    public get _components():Record<string, ComponentClass>{
        return this.__components;
    }
}

/**
 * VueEgret类
 * @description 
 * @author Hsuna
 */
export default class VueEgret extends Component {
    /** 版本号 */
    static version:string = process.env.VERSION
    /** 组件库缓存 */
    static _components:Record<string, ComponentClass> = {}
    /**
     * 设置全局组件
     * @param { string } name 组件名 用于全局定义
     * @param { ComponentOptions } options 组件配置
     */
    static component(name:string, options:ComponentOptions):ComponentClass {
        if(options) return VueEgret._components[name] = VueEgret.extend(options);
        return VueEgret._components[name];
    }
    /**
     * 通过配置，获取组件类型
     * @param { ComponentOptions } options 
     */
    static extend(options:ComponentOptions|ComponentClass):ComponentClass {
        if('function' === typeof options) return <ComponentClass>options;
        return class extends Component {
            static options:ComponentOptions = <ComponentOptions>options; 
            constructor(parentOptions: ComponentParentOptions={}) {
                super(<ComponentOptions>options, parentOptions)
            }
        }
    }
    /**
     * 通过配置，获取主类
     * 由于egret启动是需要实例化Main类
     * @param { ComponentOptions } options 
     */
    static classMain(options:ComponentOptions):Function {
        return class extends egret.DisplayObjectContainer {
            constructor(){
                super()
                this.addChild((new (VueEgret.extend(options)) as Component).$el)
            }
        }
    }
    constructor(options:ComponentOptions) {
        super(options)
    }
}