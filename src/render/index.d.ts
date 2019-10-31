import { Component } from "../index";
export declare function installRender(target: any): void;
export default class Render {
    private _timeoutCool;
    private _ast;
    private _vm;
    private _vnode;
    private _newVnode;
    constructor(vm: Component);
    private _init;
    private _tick;
    update(): void;
    destroy(): void;
    private _patch;
    private _patchVNode;
    private _updateChildren;
    private _sameVNode;
    private _createVNode;
    private _createDisObj;
    private _updateDisObj;
    private _destroyDisObj;
}
