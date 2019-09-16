import { observe } from './observer/index'
import Watcher from './observer/watcher'
import Compile from './helpers/compile'
import { pushTarget, popTarget } from './observer/dep'
import { noop, isPlainObject } from './util/index'

export class Component {
    private _data: any;
    options: any;
    sp: egret.DisplayObject;
    _compile: Compile;
    _watcher: Watcher;
    _watchers: Array<Watcher> = [];

    constructor(sp:egret.DisplayObject, options:any) {
        this.sp = sp;
        this.options = options;

        this._init()
    }
    /* _callhook(name){
        if('function' === typeof this._options[name]){
            this._options[name]()
        }
    } */
    private _init() {
        this._initData()
        this._initMethods()
        this._initWatch()
        this._compile = new Compile(this)
        this._watcher = new Watcher(this, this._compile.render.bind(this._compile), noop)
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
}

export default class VueEgret extends egret.Sprite {
    static _components = {}
    static component = (name:string, options:any) => {
        VueEgret._components[name] = VueEgret.classFactory(options)
    }
    static classFactory = (options):any => class extends VueEgret { constructor(){ super(options) } }
    constructor(options){
        super()
        new Component(this, options)
    }
    public created() {
        
    }
    public destroyed() {
        
    }
}