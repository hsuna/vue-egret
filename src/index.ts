/*!
* vue-egret 1.0.0
* @author Hsuna
*/
/// <reference path="./egret.d.ts" />

import Render from './render';
import Watcher from './observer/watcher'
import { observe } from './observer/index'
import { pushTarget, popTarget } from './observer/dep'
import { noop, isPlainObject } from './util/index'
import { validateProp } from './util/props'

export interface ComponentClass {
    options:ComponentOptions;
    new (parentOptions:ComponentParentOptions);
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

export class ComponentEvent extends egret.Event {
    public data:any;
    constructor(type:string, data:any, bubbles:boolean=false, cancelable:boolean = false) {
        super(type, bubbles, cancelable);
        this.data = data;
    }
}

export class Component {
    sp: egret.DisplayObject;
    parentOptions: ComponentParentOptions;
    options: ComponentOptions;

    // private __tickHandler: ComponentMap<Function> = [];
    private __data: any={};
    private __props: any={};
    private __render: Render;
    private __watcher: Watcher;
    private __watchers: Array<Watcher> = [];
    private __components: ComponentMap<ComponentClass> = {};
    private __nextTickCall: Array<Function> = [];
    public __refs: ComponentMap<egret.DisplayObject|Component> = {};

    constructor(sp:egret.DisplayObject, options:ComponentOptions={}, parentOptions: ComponentParentOptions={}) {
        this.sp = sp;
        this.options = options;
        this.parentOptions = parentOptions;
        this._init()
    }

    public _init() {
        this._initMethods(this.options.methods)
        this._initData(this.options.data)
        this._initProps(this.options.props, this.parentOptions.propsData)
        this._initComputed(this.options.computed);
        this.$callHook('beforeCreate');
        this._initWatch(this.options.watch)
        this._initComponents(this.options.components)
        this.$callHook('created');
        this.$callHook('beforeMounted');
        this.__render = new Render(this)
        this.__watcher = new Watcher(this, this.__render.update.bind(this.__render), noop)
        this.$callHook('mounted');
    }
    private _initProps(propsOptions: any={}, propsData:any={}) {
        for(const key in propsOptions){
            this.__props[key] = propsData[key] || validateProp(propsOptions[key])
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
        this.sp.dispatchEvent(new ComponentEvent(event, data));
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
    public $destroy(){
        this.__watchers = null;
        this.__render.destroy()
        this.__render = null
    }
    public $nextTick(callback:Function) {
        this.__nextTickCall.push(callback)
    }
    public $displayObject(ref:any):egret.DisplayObject {
        if('string' === typeof ref){
            if(this.__refs[ref] instanceof Component) 
                return (this.__refs[ref] as Component).sp
            else (this.__refs[ref] instanceof egret.DisplayObject) 
                return this.__refs[ref] as egret.DisplayObject
        }else if(ref instanceof egret.DisplayObject){
            return ref as egret.DisplayObject
        }
        return null;
    }
    public $hitTestPoint(ref:any, x:number, y:number, shapeFlag?: boolean): boolean {
        let disObj: egret.DisplayObject = this.$displayObject(ref)
        return disObj ? disObj.hitTestPoint(x, y, shapeFlag) : false
    }
    public $globalToLocal(ref:any, stateX:number, stateY:number): egret.Point {
        let disObj: egret.DisplayObject = this.$displayObject(ref)
        let resultPoint: egret.Point = new egret.Point(stateX, stateY)
        disObj && disObj.globalToLocal(stateX, stateY, resultPoint)
        return resultPoint
    }
    public $localToGlobal(ref:any, stateX:number, stateY:number): egret.Point {
        let disObj: egret.DisplayObject = this.$displayObject(ref)
        let resultPoint: egret.Point = new egret.Point(stateX, stateY)
        disObj && disObj.localToGlobal(stateX, stateY, resultPoint)
        return resultPoint
    }
    public get $refs():ComponentMap<egret.DisplayObject|Component> {
        return this.__refs;
    }
    public get $stage():egret.Stage {
        return this.sp && this.sp.stage
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

export default class VueEgret extends egret.Sprite {
    public vm:Component;

    static _components:ComponentMap<ComponentClass> = {}
    static component = (name:string, options:ComponentOptions) => {
        VueEgret._components[name] = VueEgret.classFactory(options)
    }
    static classFactory = (options:ComponentOptions):ComponentClass => class extends VueEgret { 
        static options:ComponentOptions = options; 
        constructor(parentOptions: ComponentParentOptions={}) {
            super() 
            this.vm = new Component(this as egret.DisplayObject, options, parentOptions)
        } 
    }

    public destroy(){
        if(this.vm){
            this.vm.$destroy()
            this.vm.$callHook('destroyed')
            this.vm = null
        }
    }
}