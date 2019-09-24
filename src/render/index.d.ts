import { Component } from "../index";
export declare function installRender(target: any): void;
export default class Render {
    private _ast;
    private _vm;
    private _vnode;
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
