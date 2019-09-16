import { noop, isObject, parsePath } from '../util/index'

import { Component } from '../index'
import Dep, { pushTarget, popTarget } from './dep'

// watcher实例的ID 每个watcher实现的ID都是唯一的
let uid = 0

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

    constructor(
        vm: Component,
        expOrFn?: string | Function,
        cb?: Function,
    ) {
        vm._watchers.push(this)
        this.id = uid++
        this.active = true;
        this.vm = vm   
        // 存放dep实例
        this.deps = []
        this.newDeps = []
        // 存放dep的ID
        this.depIds = new Set()
        this.newDepIds = new Set()
        // 更新触发回调函数
        this.cb = cb
        this.expression = expOrFn.toString()
        if ('function' === typeof expOrFn) {
            this.getter = expOrFn
        } else {
            this.getter = parsePath(expOrFn)
            if (!this.getter) {
                this.getter = noop
            }
        }
        // 在创建watcher实例时先取一次值
        this.value = this.get()
    }

    /**
     * Evaluate the getter, and re-collect dependencies.
     */
    get () {
        pushTarget(this)
        const value = this.getter.call(this.vm, this.vm)
        // "touch" every property so they are all tracked as
        // dependencies for deep watching
        popTarget()
        this.cleanupDeps()
        return value
    }

    /**
     * Add a dependency to this directive.
     */
    addDep (dep: Dep) {
        const id = dep.id
        if (!this.newDepIds.has(id)) {
            this.newDepIds.add(id)
            this.newDeps.push(dep)
            if (!this.depIds.has(id)) {
                dep.addSub(this)
            }
        }
    }

    /**
     * Clean up for dependency collection.
     */
    cleanupDeps () {
        let i = this.deps.length
        while (i--) {
            const dep = this.deps[i]
            if (!this.newDepIds.has(dep.id)) {
                dep.removeSub(this)
            }
        }
        let tmp:Set<number> = this.depIds
        this.depIds = this.newDepIds
        this.newDepIds = tmp
        this.newDepIds.clear()
        let tmp2:Array<Dep> = this.deps
        this.deps = this.newDeps
        this.newDeps = tmp2
        this.newDeps.length = 0
    }

     /**
     * Subscriber interface.
     * Will be called when a dependency changes.
     */
    update () {
        /* istanbul ignore else */
        this.run()
    }

    /**
     * Scheduler job interface.
     * Will be called by the scheduler.
     */
    run () {
        if (!this.active) return;

        const value = this.get()
        if (
            value !== this.value ||
            // Deep watchers and watchers on Object/Arrays should fire even
            // when the value is the same, because the value may
            // have mutated.
            isObject(value) 
        ) {
            // set new value
            const oldValue = this.value
            this.value = value
            this.cb.call(this.vm, value, oldValue)
        }
    }

    /**
     * Depend on all deps collected by this watcher.
     */
    depend () {
        let i = this.deps.length
        while (i--) {
            this.deps[i].depend()
        }
    }

    
    /**
     * Remove self from all dependencies' subscriber list.
     */
    teardown () {
        if (!this.active) return;

        // remove self from vm's watcher list
        // this is a somewhat expensive operation so we skip it
        // if the vm is being destroyed.
        let i = this.deps.length
        while (i--) {
        this.deps[i].removeSub(this)
        }
        this.active = false
    }
}