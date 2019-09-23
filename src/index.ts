/*!
* vue-egret 1.0.0
* @author Hsuna
*/
/// <reference path="./egret.d.ts" />

import Render from './render';
import { observe } from './observer/index'
import Watcher from './observer/watcher'
import { pushTarget, popTarget } from './observer/dep'
import { noop, isPlainObject } from './util/index'
import { validateProp } from './util/props'

export interface ComponentMap<T> {
    [propName:string]: T;
}
export interface ComponentOptions {
    template?: string;
    data?: Function | Object;
    props?: Object;
    computed?: Object;
    components?: ComponentMap<ComponentOptions>;
    methods?: {
        [propName:string]: Function;
    };
    beforeCreate?: Function;
    created?: Function;
    beforeDestroyed?: Function;
    destroyed?: Function;
}

export class Component {
    sp: egret.DisplayObject;
    options: ComponentOptions;

    private __data: any={};
    private __props: any={};
    private __render: Render;
    private __watcher: Watcher;
    private __watchers: Array<Watcher> = [];
    private __components: ComponentMap<Function> = {};

    constructor(sp:egret.DisplayObject, options:ComponentOptions={}) {
        this.sp = sp;
        this.options = options;

        this._init()
    }
    private _init() {
        this._initProps(this.options.props)
        this._initMethods(this.options.methods)
        this._initData(this.options.data)
        this._initComputed(this.options.computed);
        this.$callHook('beforeCreate');
        this._initWatch()
        this._initComponents(this.options.components)
        this.$callHook('created');
        this.__render = new Render(this)
        this.__watcher = new Watcher(this, this.__render.update.bind(this.__render), noop)
    }
    private _initProps(propsOptions: any={}) {
        for(const key in propsOptions){

            this.__props[key] = validateProp(propsOptions[key])
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
        if('function' === typeof this.options[name]){
            this.options[name].call(this, ...rest)
        }
    }

    public get _data():any{
        return this.__data;
    }
    public set _props(val:any){
        this.__props = val;
    }
    public get _props():any{
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
    public get _components():ComponentMap<Function>{
        return this.__components;
    }
}

export default class VueEgret extends egret.Sprite {
    static _components:ComponentMap<Function> = {}
    static component = (name:string, options:ComponentOptions) => {
        VueEgret._components[name] = VueEgret.classFactory(options)
    }
    static classFactory = (options:ComponentOptions):Function => class extends VueEgret { constructor(){ super(options) } }

    public vm:Component;
    constructor(options:ComponentOptions){
        super()
        this.vm = new Component(this as egret.DisplayObject, options)
    }
}