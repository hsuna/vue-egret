import { Component } from '..';
import {
  def,
  hasProto,
  isObject,
  isPlainObject,
  isUndef,
  isPrimitive,
  isValidArrayIndex,
  hasOwn,
} from '../util/index';
import { arrayMethods, arrayKeys } from './array';
import Dep from './dep';

export default class Observer {
  value: any;
  dep: Dep;
  vmCount: number;

  constructor(value: any) {
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;
    def(value, '__ob__', this);
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods);
      } else {
        copyAugment(value, arrayMethods, arrayKeys);
      }
      value.forEach((item) => observe(item));
    } else {
      this.walk(value);
    }
  }

  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk(obj: Object) {
    for (const key in obj) {
      defineReactive(obj, key);
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray(items: Array<any>) {
    items.forEach((item) => observe(item));
  }
}

/**
 * Define a reactive property on an Object.
 */
export function defineReactive(obj: Object, key: string, val?: any) {
  const dep = new Dep();

  const property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }

  // cater for pre-defined getter/setters
  const getter = property && property.get;
  const setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = (obj as any)[key];
  }
  let childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      const value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value;
    },
    set(newVal) {
      const value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return;
      }
      try {
        if (
          (Array.isArray(newVal) || isPlainObject(newVal)) &&
          Object.isExtensible(newVal) &&
          !(newVal instanceof egret.HashObject) &&
          !newVal._isVue
        ) {
          // 复杂类型的比较，如果复杂类型数据没有不同，只是引用不一的话，则不更新
          return;
        }
      } catch (e) {
        // TODO
        console.log(e);
      }

      // #7981: for accessor properties without setter
      if (getter && !setter) return;
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    },
  });
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
export function observe(value: any, asRootData?: boolean): Observer {
  if (!isObject(value)) return;
  let ob: Observer;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !(value instanceof egret.HashObject) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob;
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
export function set(target: Array<any> | Object, key: string | number, val: any): any {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key as number);
    target.splice(key as number, 1, val);
    return val;
  }
  if (key in target && !(key in Object.prototype)) {
    (target as any)[key] = val;
    return val;
  }
  const ob = (target as any).__ob__;
  if ((target as Component)._isVue || (ob && ob.vmCount)) {
    console.warn(
      'Avoid adding reactive properties to a Vue instance or its root $data at runtime - declare it upfront in the data option.',
    );
    return val;
  }
  if (!ob) {
    (target as any)[key] = val;
    return val;
  }
  defineReactive(ob.value, key as string, val);
  ob.dep.notify();
  return val;
}

/**
 * Delete a property and trigger change if necessary.
 */
export function del(target: Array<any> | Object, key: string | number) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key as number, 1);
    return;
  }
  const ob = (target as any).__ob__;
  if ((target as Component)._isVue || (ob && ob.vmCount)) {
    console.warn(
      'Avoid deleting properties on a Vue instance or its root $data - just set it to null.',
    );
    return;
  }
  if (!hasOwn(target, key as string)) {
    return;
  }
  delete (target as any)[key];
  if (!ob) {
    return;
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray(arr: Array<any>) {
  arr.forEach((e) => {
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  });
}

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment(target: any, src: Object) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment(target: Object, src: Object, keys: Array<string>) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];
    def(target, key, (src as any)[key]);
  }
}
