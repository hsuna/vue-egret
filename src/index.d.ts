/// <reference types="types/egret" />
/// <reference types="types/tween" />
import Render from './render';
import Watcher from './observer/watcher';
export interface ComponentClass {
    options: ComponentOptions;
    new (sp: egret.DisplayObjectContainer, parentOptions: ComponentParentOptions): any;
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
export declare type ComponentRef = String | Component | egret.DisplayObject;
export declare class ComponentEvent extends egret.Event {
    data: any;
    constructor(type: string, data: any, bubbles?: boolean, cancelable?: boolean);
}
export declare class Component {
    $el: egret.DisplayObject;
    parentOptions: ComponentParentOptions;
    options: ComponentOptions;
    private __global;
    private __data;
    private __props;
    private __render;
    private __watcher;
    private __watchers;
    private __components;
    private __nextTickCall;
    __refs: ComponentMap<egret.DisplayObject | Component>;
    constructor($el: egret.DisplayObject, options?: ComponentOptions, parentOptions?: ComponentParentOptions);
    _init(): void;
    private _initGlobal;
    private _initProps;
    private _initData;
    private _initMethods;
    private _initComputed;
    private _initWatch;
    private _initComponents;
    private _getData;
    private _createWatcher;
    _$tick(): void;
    $emit(event: string, data: any): Component;
    $watch(expOrFn: string | Function, cb: any, options?: Object): Function;
    $callHook(name: string, ...rest: any[]): void;
    $destroy(): void;
    $nextTick(callback: Function): void;
    $displayObject(ref: ComponentRef): egret.DisplayObject;
    $hitTest(ref1: ComponentRef, ref2: ComponentRef): boolean;
    $hitTestPoint(ref: ComponentRef, x: number, y: number, shapeFlag?: boolean): boolean;
    $globalToLocal(ref: ComponentRef, stateX: number, stateY: number): egret.Point;
    $localToGlobal(ref: ComponentRef, stateX: number, stateY: number): egret.Point;
    $tween(tween?: egret.Tween): egret.Tween;
    $tweenTo(props: any, duration?: number, ease?: Function): Promise<egret.Tween>;
    $tweenWait(duration: number, passive?: boolean): Promise<egret.Tween>;
    $tweenPromise(tween: egret.Tween): Promise<egret.Tween>;
    readonly $refs: ComponentMap<egret.DisplayObject | Component>;
    readonly $stage: egret.Stage;
    readonly _data: any;
    _props: any;
    readonly _render: Render;
    readonly _watcher: Watcher;
    readonly _watchers: Array<Watcher>;
    readonly _components: ComponentMap<ComponentClass>;
}
export default class VueEgret extends Component {
    static _components: ComponentMap<ComponentClass>;
    static component: (name: string, options: ComponentOptions) => void;
    static classFactory: (options: ComponentOptions) => ComponentClass;
    static classMain: (options: ComponentOptions) => any;
    constructor(options: ComponentOptions);
}
