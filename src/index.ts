import Observer from './observer/index'
import Watcher from './observer/watcher'
import Compile from './helpers/compile'

export class VueEgretVM {
    private _data: any;
    options: any;
    sp: egret.DisplayObjectContainer;
    public watchers: Array<Watcher>

    constructor(sp:egret.DisplayObjectContainer, options:any) {
        this.sp = sp;
        this.watchers = [];
        this.options = options;

        this._init()
    }
    /* _callhook(name){
        if('function' === typeof this._options[name]){
            this._options[name]()
        }
    } */
    private _init() {
        this._initData();
        this._initMethods()
         // 监听数据
         new Observer(this._data)
         new Compile(this)
    }
    private _initData() {
        const { data } = this.options
        this._data = typeof data === 'function'? data() : data || {};
        Object.keys(this._data).forEach(key => Object.defineProperty(this, key, {
            get(){
                return this['_data'][key]
            },
            set(val){
                this['_data'][key] = val
            }
        }))
    }
    private _initMethods() {
        const { methods={} } = this.options
        // 将methods上的方法赋值到vm实例上
        Object.keys(methods).forEach(e => this[e] = methods[e])
    }
}

export default class VueEgret extends egret.Sprite {
    static _components = {}
    static component=(name:string, options:any) => {
        VueEgret._components[name] = new VueEgret(options)
    }
    constructor(options){
        super()
        
        new VueEgretVM(this, options)
    }
    public created() {
        
    }
    public destroyed() {
        
    }
}