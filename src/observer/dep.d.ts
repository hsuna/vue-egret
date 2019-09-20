import Watcher from './watcher';
export default class Dep {
    static target: Watcher;
    id: number;
    subs: Array<Watcher>;
    constructor();
    depend(): void;
    addSub(sub: Watcher): void;
    removeSub(sub: Watcher): void;
    notify(): void;
}
export declare function pushTarget(target?: Watcher): void;
export declare function popTarget(): void;
