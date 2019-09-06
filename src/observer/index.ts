import Dep from './dep'

export default class Observer {
    value: any;
    dep: Dep;
    
    constructor(value: any){
        this.value = value;
        this.dep = new Dep;
        this.walk(value)
    }

    /**
     * Walk through all properties and convert them into
     * getter/setters. This method should only be called when
     * value type is Object.
     */
    walk (obj: Object) {
        Object.keys(key => {
            defineReactive(obj, key, obj[key])
        })
    }
}

function defineReactive(obj:Object, key:string, val:any) {
    const dep = new Dep()

    // 如果值是一个对象 递归监听
    if (typeof val === 'object') {
        new Observer(val)
    }
    
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            // 收集对应的观察者对象
            if (Dep.target) {
                dep.depend()
            }
            return val
        },
        set(newVal) {
            if (val === newVal) {
                return
            }
            val = newVal
            // 如果新值是对象 递归监听
            if (typeof val === 'object') {
                new Observer(val)
            }
            // 触发更新
            dep.notify()
        }
    })
}