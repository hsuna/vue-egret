import { Component } from '../index';
import Dep from './dep';
export default class Watcher {
    active: boolean;
    id: number;
    vm: Component;
    expression: string;
    deps: Array<Dep>;
    newDeps: Array<Dep>;
    depIds: Set<number>;
    newDepIds: Set<number>;
    cb: Function;
    getter: Function;
    setter: Function;
    value: any;
    constructor(vm: Component, expOrFn?: string | Function, cb?: Function);
    get(): any;
    addDep(dep: Dep): void;
    cleanupDeps(): void;
    update(): void;
    run(): void;
    depend(): void;
    teardown(): void;
}
