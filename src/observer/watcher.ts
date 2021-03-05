import { noop, isObject, parsePath } from '../util/index';

import { Component } from '../index';
import Dep, { pushTarget, popTarget } from './dep';
import { traverse } from './traverse';

// watcher实例的ID 每个watcher实现的ID都是唯一的
let uid = 0;

export interface WatchOptions {
  handler: Function;
  immediate?: boolean;
  deep?: boolean;
  user?: boolean;
  lazy?: boolean;
  sync?: boolean;
  before?: Function;
}

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

  deep: boolean;
  user: boolean;
  lazy: boolean;
  sync: boolean;
  immediate: boolean;
  before: Function;

  constructor(vm: Component, expOrFn?: string | Function, cb?: Function, options?: WatchOptions) {
    // options
    if (options) {
      this.deep = !!options.deep;
      this.user = !!options.user;
      this.lazy = !!options.lazy;
      this.sync = !!options.sync;
      this.immediate = !!options.immediate;
      this.before = options.before;
    } else {
      this.deep = this.user = this.lazy = this.sync = this.immediate = false;
    }

    vm._watchers.push(this);
    this.id = uid++;
    this.active = true;
    this.vm = vm;
    // 存放dep实例
    this.deps = [];
    this.newDeps = [];
    // 存放dep的ID
    this.depIds = new Set();
    this.newDepIds = new Set();
    // 更新触发回调函数
    this.cb = cb || noop;
    this.expression = expOrFn.toString();
    if ('function' === typeof expOrFn) {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
      if (!this.getter) {
        this.getter = noop;
      }
    }
    // 在创建watcher实例时先取一次值
    this.value = this.get();

    if (this.immediate) {
      try {
        cb.call(vm, this.value);
      } catch (error) {
        console.error(`callback for immediate watcher "${this.expression}"`);
      }
    }
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  get() {
    pushTarget(this);
    let value;
    try {
      value = this.getter.call(this.vm, this.vm);
    } catch (e) {
      // TODO
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value);
      }
      popTarget();
      this.cleanupDeps();
    }
    return value;
  }

  /**
   * Add a dependency to this directive.
   */
  addDep(dep: Dep) {
    const id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);
      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  }

  /**
   * Clean up for dependency collection.
   */
  cleanupDeps() {
    let i = this.deps.length;
    while (i--) {
      const dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this);
      }
    }
    const tmp: Set<number> = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear();
    const tmp2: Array<Dep> = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp2;
    this.newDeps.length = 0;
  }

  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  update() {
    /* istanbul ignore else */
    this.run();
  }

  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
  run() {
    if (!this.active) return;

    const value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value)
    ) {
      // set new value
      const oldValue = this.value;
      this.value = value;
      this.cb.call(this.vm, value, oldValue);
    }
  }

  /**
   * Depend on all deps collected by this watcher.
   */
  depend() {
    let i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  }

  /**
   * Remove self from all dependencies' subscriber list.
   */
  teardown() {
    if (!this.active) return;

    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    let i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
}
