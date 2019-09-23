/*!
* vue-egret 1.0.0
* @author Hsuna
*/
/// <reference types="src/egret" />
import Render from './render';
import Watcher from './observer/watcher';
export interface ComponentMap<T> {
    [propName: string]: T;
}
export interface ComponentOptions {
    template?: string;
    data?: Function | Object;
    props?: Object;
    computed?: Object;
    components?: ComponentMap<ComponentOptions>;
    methods?: {
        [propName: string]: Function;
    };
    beforeCreate?: Function;
    created?: Function;
    beforeDestroyed?: Function;
    destroyed?: Function;
}
export declare class Component {
    sp: egret.DisplayObject;
    options: ComponentOptions;
    private __data;
    private __props;
    private __render;
    private __watcher;
    private __watchers;
    private __components;
    constructor(sp: egret.DisplayObject, options?: ComponentOptions);
    private _init;
    private _initProps;
    private _initData;
    private _initMethods;
    private _initComputed;
    private _initWatch;
    private _initComponents;
    private _getData;
    private _createWatcher;
    $emit(event: string): Component;
    $watch(expOrFn: string | Function, cb: any, options?: Object): Function;
    $callHook(name: string, ...rest: any[]): void;
    readonly _data: any;
    _props: any;
    readonly _render: Render;
    readonly _watcher: Watcher;
    readonly _watchers: Array<Watcher>;
    readonly _components: ComponentMap<Function>;
}
export default class VueEgret extends egret.Sprite {
    static _components: ComponentMap<Function>;
    static component: (name: string, options: ComponentOptions) => void;
    static classFactory: (options: ComponentOptions) => Function;
    vm: Component;
    constructor(options: ComponentOptions);
}
