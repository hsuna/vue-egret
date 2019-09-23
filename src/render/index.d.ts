import { VNode } from "./v-node";
import { Component } from "../index";
export declare function installRender(target: any): void;
export default class Render {
    vm: Component;
    vnode: VNode;
    astCode: string;
    constructor(vm: Component);
    private _init;
    update(): void;
    private _patch;
    private _patchVNode;
    private _updateChildren;
    private _sameVNode;
    private _createVNode;
    private _createDisObj;
    private _updateDisObj;
    private _destroyDisObj;
}
