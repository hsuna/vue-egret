import { def, hasProto } from '../util/index'
import { arrayMethods, arrayKeys } from './array'
import Dep from './dep'

export default class Observer {
    value: any;
    dep: Dep;
    
    constructor(value: any){
        this.value = value;
        this.dep = new Dep;
        def(value, '__ob__', this)
        if (Array.isArray(value)) {
          if (hasProto) {
            protoAugment(value, arrayMethods)
          } else {
            copyAugment(value, arrayMethods, arrayKeys)
          }
          value.forEach(item => observe(item))
        } else {
          this.walk(value)
        }
    }

    /**
     * Walk through all properties and convert them into
     * getter/setters. This method should only be called when
     * value type is Object.
     */
    walk (obj: Object) {
        for(const key in obj){
            this.defineReactive(obj, key)
        }
    }

    /**
     * Observe a list of Array items.
     */
    observeArray (items: Array<any>) {
        items.forEach(item => observe(item))
    }
    
    defineReactive(obj:Object, key:string, val?:any) {
        const dep = new Dep()

        const property = Object.getOwnPropertyDescriptor(obj, key)
        if (property && property.configurable === false) {
            return
        }

        // cater for pre-defined getter/setters
        const getter = property && property.get
        const setter = property && property.set
        if ((!getter || setter) && arguments.length === 2) {
            val = obj[key]
        }
        let childOb = observe(val)
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                const value = getter ? getter.call(obj) : val
                if (Dep.target) {
                    dep.depend()
                    if (childOb) {
                        childOb.dep.depend()
                        if (Array.isArray(value)) {
                            dependArray(value)
                        }
                    }
                }
                return value
            },
            set(newVal) {
                const value = getter ? getter.call(obj) : val
                /* eslint-disable no-self-compare */
                if (newVal === value || (newVal !== newVal && value !== value)) {
                    return
                }
                // #7981: for accessor properties without setter
                if (getter && !setter) return
                if (setter) {
                    setter.call(obj, newVal)
                } else {
                    val = newVal
                }
                childOb = observe(newVal)
                dep.notify()
            }
        })
    }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
export function observe (value: any): Observer {
    if(!value || typeof value !== 'object') return;
    let ob: Observer
    if (Object.prototype.hasOwnProperty.call(value, '__ob__') && value.__ob__ instanceof Observer) {
      ob = value.__ob__
    } else if(!(value instanceof egret.DisplayObject)){
      ob = new Observer(value)
    }
    return ob
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (arr: Array<any>) {
    arr.forEach(e => {
        e && e.__ob__ && e.__ob__.dep.depend()
        if (Array.isArray(e)) {
          dependArray(e)
        }
    })
}  

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src: Object) {
    /* eslint-disable no-proto */
    target.__proto__ = src
    /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target: Object, src: Object, keys: Array<string>) {
    for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i]
        def(target, key, src[key])
    }
}