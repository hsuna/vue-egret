import Dep from './dep';
export default class Observer {
    value: any;
    dep: Dep;
    constructor(value: any);
    walk(obj: Object): void;
    observeArray(items: Array<any>): void;
    defineReactive(obj: Object, key: string, val?: any): void;
}
export declare function observe(value: any): Observer;
