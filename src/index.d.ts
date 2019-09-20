/*!
* vue-egret 1.0.0
* @author Hsuna
*/
import Render from './render';
import Watcher from './observer/watcher';
export interface ComponentMap<T> {
    [propName: string]: T;
}
export interface ComponentOptions {
    template?: string;
    data?: Function | Object;
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
    private _data;
    options: ComponentOptions;
    sp: egret.DisplayObject;
    _render: Render;
    _watcher: Watcher;
    _watchers: Array<Watcher>;
    _components: ComponentMap<Function>;
    constructor(sp: egret.DisplayObject, options: any);
    private _init;
    private _initData;
    private _initMethods;
    private _initWatch;
    private _initComponents;
    private _getData;
    private _createWatcher;
    $watch(expOrFn: string | Function, cb: any, options?: Object): Function;
    $callHook(name: string, ...rest: any[]): void;
}
export default class VueEgret extends egret.Sprite {
    static _components: ComponentMap<Function>;
    static component: (name: string, options: ComponentOptions) => void;
    static classFactory: (options: ComponentOptions) => Function;
    vm: Component;
    constructor(options: ComponentOptions);
}
