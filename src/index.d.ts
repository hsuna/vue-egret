/*!
* vue-egret 1.0.0
* @author Hsuna
*/
/// <reference types="src/egret" />
import Render from './render';
import Watcher from './observer/watcher';
export interface ComponentClass {
    options: ComponentOptions;
    new (parentOptions: ComponentParentOptions): any;
}
export interface ComponentMap<T> {
    [propName: string]: T;
}
export interface ComponentParentOptions {
    parent?: Component;
    propsData?: ComponentMap<any>;
    _propsKeys?: Array<string>;
}
export interface ComponentOptions {
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
export declare class ComponentEvent extends egret.Event {
    data: any;
    constructor(type: string, data: any, bubbles?: boolean, cancelable?: boolean);
}
export declare class Component {
    sp: egret.DisplayObject;
    parentOptions: ComponentParentOptions;
    options: ComponentOptions;
    private __data;
    private __props;
    private __render;
    private __watcher;
    private __watchers;
    private __components;
    __refs: ComponentMap<egret.DisplayObject>;
    constructor(sp: egret.DisplayObject, options?: ComponentOptions, parentOptions?: ComponentParentOptions);
    _init(): void;
    private _initProps;
    private _initData;
    private _initMethods;
    private _initComputed;
    private _initWatch;
    private _initComponents;
    private _getData;
    private _createWatcher;
    $emit(event: string, data: any): Component;
    $watch(expOrFn: string | Function, cb: any, options?: Object): Function;
    $callHook(name: string, ...rest: any[]): void;
    $nextTick(callback: Function): void;
    readonly $refs: ComponentMap<egret.DisplayObject>;
    readonly _data: any;
    _props: any;
    readonly _render: Render;
    readonly _watcher: Watcher;
    readonly _watchers: Array<Watcher>;
    readonly _components: ComponentMap<ComponentClass>;
}
export default class VueEgret extends egret.Sprite {
    vm: Component;
    static _components: ComponentMap<ComponentClass>;
    static component: (name: string, options: ComponentOptions) => void;
    static classFactory: (options: ComponentOptions) => ComponentClass;
}
