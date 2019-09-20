/*!
* vue-egret 1.0.0
* @author Hsuna
*/

import Render from './render';
import { observe } from './observer/index'
import Watcher from './observer/watcher'
import { pushTarget, popTarget } from './observer/dep'
import { noop, isPlainObject } from './util/index'

export interface ComponentMap<T> {
    [propName:string]: T;
}
export interface ComponentOptions {
    template: string;
    data: Function | Object;
    methods: {
        [propName:string]: Function;
    };
    beforeCreate?: Function;
    created?: Function;
    beforeDestroyed?: Function;
    destroyed?: Function;
    components?: ComponentMap<ComponentOptions>;
}

export class Component {
    private _data: any;
    options: ComponentOptions;
    sp: egret.DisplayObject;
    _render: Render;
    _watcher: Watcher;
    _watchers: Array<Watcher> = [];
    _components: ComponentMap<Function> = {};

    constructor(sp:egret.DisplayObject, options:any) {
        this.sp = sp;
        this.options = options;

        this._init()
    }
    private _init() {
        this.$callHook('beforeCreate');
        this._initData()
        this._initMethods()
        this._initWatch()
        this._initComponents()
        this.$callHook('created');
        this._render = new Render(this)
        this._watcher = new Watcher(this, this._render.update.bind(this._render), noop)
    }
    private _initData() {
        const { data } = this.options
        this._data = typeof data === 'function'? this._getData(data) : data || {};
        Object.keys(this._data).forEach(key => Object.defineProperty(this, key, {
            get(){
                return this['_data'][key]
            },
            set(val){
                this['_data'][key] = val
            }
        }))
        // 监听数据
        observe(this._data)
    }
    private _initMethods() {
        const { methods={} } = this.options
        // 将methods上的方法赋值到vm实例上
        Object.keys(methods).forEach(e => this[e] = methods[e])
    }
    private _initWatch (watch: Object={}) {
        Object.keys(watch).forEach(key => {
            const handler = watch[key]
            if (Array.isArray(handler)) {
                handler.forEach(h => this._createWatcher(key, h))
            } else {
                this._createWatcher(key, handler)
            }
        })
    }
    private _initComponents(){
        const components:ComponentMap<ComponentOptions> = this.options.components || {}
        Object.keys(components).forEach((name:string) => {
            this._components[name] = VueEgret.classFactory(components[name])
        })
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
        this.vm = new Component(this, options)
    }
}