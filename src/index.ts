/*
 * vue-egret
 * @author Hsuna
 */
///<reference path="../types/egret.d.ts" />
///<reference path="../types/tween.d.ts" />

import Render from './render';
import { VNode } from './render/v-node';

import Watcher, { WatchOptions } from './observer/watcher';
import { del, observe, set } from './observer/index';
import { pushTarget, popTarget } from './observer/dep';
import { noop, emptyObject, isPlainObject, isHook, hasOwn } from './util/index';
import { validateProp, normalizeProp } from './util/props';
import { DirectiveHook, DirectiveOptions } from './directives';
import { nextTick } from './util/next-tick';
import { tween } from './util/tween';

export type TArray<T> = T | Array<T>;

export interface PropData {
  type: Function;
  default?: any;
  required?: boolean;
  validator?: Function;
}

export interface ComponentClass {
  options: ComponentOptions;
  new (parentOptions?: ComponentParentOptions): Component;
}
export interface ComponentParentOptions {
  parent?: Component;
  attrs?: Record<string, any>;
  listeners?: Record<string, Function>;
  propsData?: Record<string, PropData | Function>;
  _propsKeys?: Array<string>;
}

export interface ComponentOptions {
  // data
  data: Function | Object;
  props: Array<string> | Record<string, PropData | Function>;
  _parentOptions: ComponentParentOptions;
  computed: Record<string, Function>;
  methods: Record<string, Function>;
  watch?: Record<string, Function>;

  // DisplayObject
  template: string;
  render: (createVNode: (tag: string, data: any, children: Array<VNode>) => VNode) => VNode;

  // lifecycle
  beforeCreate: Function;
  created: Function;
  beforeMounted: Function;
  mounted: Function;
  beforeUpdate: Function;
  update: Function;
  beforeDestroyed: Function;
  destroyed: Function;

  // assets
  directives?: Record<string, DirectiveOptions>;
  components?: Record<string, ComponentOptions>;

  // ext
  inheritAttrs: boolean;
}

/** 类型-注册信息 */
export type RefData = Component | egret.DisplayObject;
export type ComponentRef = string | RefData;

/** 组件矩形 */
export interface ComponentRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * 组件类
 * @author Hsuna
 * @param { ComponentOptions } options 组件配置
 * @param { ComponentParentOptions } parentOptions 继承配置
 */
export class Component {
  /** 显示对象 */
  $el: egret.DisplayObject;
  /** 根组件 */
  $root: Component;
  /** 父组件 */
  $parent: Component;
  /** 子组件集合 */
  $children: Array<Component> = [];
  /** 获取注册列表 */
  $refs: Record<string, TArray<RefData>> = {};
  /** 组件配置 */
  $options: ComponentOptions;

  // 全局方法
  /** 设置对象的 property */
  $set = set;
  /** 删除对象的 property */
  $delete = del;
  /** 回调延迟到下次更新 */
  $nextTick = nextTick;
  /** Tween方法 */
  $tween = tween;

  // private __tickHandler: ComponentMap<Function> = [];
  private _global: Record<string, any> = {};
  private _data: Record<string, any> = {};
  private _props: Record<string, Array<string> | Record<string, PropData | Function>> = {};
  private _hasHookEvent = false;

  // 状态值
  public _isVue = true;
  public _isMounted = false;
  public _isBeingDestroyed = false;
  public _isDestroyed = false;

  public _render: Render;
  public _watcher: Watcher;
  public _watchers: Array<Watcher> = [];
  public _events: Record<string, Array<Function>> = {};
  public _components: Record<string, ComponentClass> = {};
  public _directives: Record<string, DirectiveOptions> = {};
  public _parentOptions: ComponentParentOptions;

  constructor(options: ComponentOptions = <any>{}, parentOptions: ComponentParentOptions = {}) {
    this.$options = options;
    this._parentOptions = parentOptions;
    this._init();
  }

  public _init() {
    this.$parent = this._parentOptions.parent;
    if (this.$parent) this.$parent.$children.push(this);
    this.$root = this.$parent ? this.$parent.$root : this;

    this._initMethods(this.$options.methods);
    this.$callHook('beforeCreate');
    this._initGlobal();
    this._initData(this.$options.data);
    this._initProps(this.$options.props, this._parentOptions.propsData);
    this._initComputed(this.$options.computed);
    this._initWatch(this.$options.watch);
    this._initComponents(this.$options.components);
    this._initDirectives(this.$options.directives);
    this.$callHook('created');
    this._render = new Render(this);
    this._initEvent();
  }
  private _initEvent() {
    /* 添加到显示列表时触发挂载 */
    this.$el.once(egret.Event.ADDED, () => this._render.inserted(), this.$el);
    /* 添加到舞台时触发挂载 */
    this.$el.once(
      egret.Event.ADDED_TO_STAGE,
      () => {
        this.$callHook('beforeMount');
        this._global.stage = this.$el.stage;
        this._watcher = new Watcher(
          this,
          () => {
            if (!this._render) return; // 防止渲染器销毁时，进程依然回调方法
            if (this._isMounted) this.$callHook('beforeUpdate');
            this._render.update();
          },
          noop,
        );
        this._isMounted = true;
        this.$callHook('mounted');
      },
      this.$el,
    );
    /* 从舞台移除时销毁该示例 */
    this.$el.once(egret.Event.REMOVED_FROM_STAGE, () => this.$destroy(), this.$el);
  }
  /** 初始化全局参数，用于全局方便获取 */
  private _initGlobal() {
    this._global = {
      stage: new egret.Stage(),
    };
    // 监听数据
    observe(this._global, true);
  }
  private _initProps(
    propsOptions: Array<string> | Record<string, PropData | Function> = {},
    propsData: Record<string, PropData | Function> = {},
  ) {
    const props: Record<string, PropData> = normalizeProp(propsOptions); // normalizeProp
    for (const key in props) {
      this._props[key] = hasOwn(propsData, key) ? propsData[key] : validateProp(props[key], this);
      Object.defineProperty(this, key, {
        get() {
          return this._props[key];
        },
        set(val) {
          console.error('The props data not set!');
        },
      });
    }
    // 监听数据
    observe(this._props, true);
  }
  private _initData(data: any) {
    this._data = typeof data === 'function' ? this._getData(data) : data || {};
    for (const key in this._data) {
      Object.defineProperty(this, key, {
        get() {
          return this._data[key];
        },
        set(val) {
          this._data[key] = val;
        },
      });
    }
    // 监听数据
    observe(this._data, true);
  }
  private _initMethods(methods: Record<string, Function> = {}) {
    // 将methods上的方法赋值到vm实例上
    for (const e in methods) {
      (this as any)[e] = methods[e];
    }
  }
  private _initComputed(computed: any = {}) {
    let propertyDefinition;
    for (const key in computed) {
      const userDef: any = computed[key] || noop;
      propertyDefinition =
        typeof userDef === 'function'
          ? { get: userDef, set: noop }
          : { get: userDef.get, set: userDef.set };
      Object.defineProperty(this, key, propertyDefinition);
    }
  }
  private _initWatch(watch: Record<string, any> = {}) {
    for (const key in watch) {
      const handler = watch[key];
      if (Array.isArray(handler)) {
        handler.forEach((h) => this._createWatcher(key, h));
      } else {
        this._createWatcher(key, handler);
      }
    }
  }
  private _initComponents(components: Record<string, ComponentOptions> = {}) {
    for (const name in components) {
      this._components[name] = VueEgret.extend(components[name]);
    }
  }
  private _initDirectives(directives: Record<string, DirectiveOptions> = {}) {
    for (const name in directives) {
      this._directives[name] = directives[name];
    }
  }
  private _getData(data: Function): any {
    pushTarget();
    try {
      return data.call(this, this);
    } catch (e) {
      console.log(e);
      return {};
    } finally {
      popTarget();
    }
  }
  private _createWatcher(expOrFn: string | Function, handler: any, options?: WatchOptions) {
    if (isPlainObject(handler)) {
      options = handler;
      handler = handler.handler;
    }
    if (typeof handler === 'string') {
      handler = (this as any)[handler];
    }
    return this.$watch(expOrFn, handler, options);
  }
  public $on(event: TArray<string>, fn: Function): Component {
    if (Array.isArray(event)) {
      event.forEach((evt) => this.$on(evt, fn));
    } else {
      const events = this._events[event] || (this._events[event] = []);
      events.push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (isHook(event)) {
        this._hasHookEvent = true;
      }
    }
    return this;
  }
  public $once(event: TArray<string>, fn: Function): Component {
    const on: any = (...args: any[]) => {
      this.$off(event, on);
      return fn.apply(this, args);
    };
    on.fn = fn;
    this.$on(event, on);
    return this;
  }
  public $off(event: TArray<string>, fn: Function): Component {
    // all
    if (!arguments.length) {
      this._events = Object.create(null);
      this._hasHookEvent = false;
      return this;
    }
    // array of events
    if (Array.isArray(event)) {
      event.forEach((evt) => this.$off(evt, fn));
      return this;
    }
    // specific event
    const cbs: Array<Function> = this._events[event];
    if (!cbs) {
      return this;
    }
    if (!fn) {
      this._events[event] = null;
      return this;
    }
    if (fn) {
      // specific handler
      let cb: Function;
      let i: number = cbs.length;
      while (i--) {
        cb = cbs[i];
        if (cb === fn) {
          cbs.splice(i, 1);
          break;
        }
      }
    }
    return this;
  }
  public $emit(event: string, ...args: Array<any>): Component {
    const cbs: Array<Function> = this._events[event];
    if (cbs) {
      [...cbs].forEach((cb: Function) => cb.apply(this.$parent, args));
    }
    return this;
  }
  /**
   *
   * @param expOrFn
   * @param cb
   * @param options
   */
  public $watch(expOrFn: string | Function, cb: any, options?: WatchOptions): Function {
    if (isPlainObject(cb)) {
      return this._createWatcher(expOrFn, cb, options);
    }
    options = options || <any>{};
    const watcher = new Watcher(this, expOrFn, cb, options);
    return function unwatchFn() {
      watcher.teardown();
    };
  }
  public $callHook(name: string, ...rest: any[]) {
    // 阻断所有数据变动
    pushTarget();
    if ('function' === typeof (this.$options as any)[name]) {
      (this.$options as any)[name].call(this, ...rest);
    }
    if (this._hasHookEvent) {
      this.$emit('hook:' + name);
    }
    popTarget();
  }
  /**
   * 强制刷新
   */
  public $forceUpdate() {
    if (this._watcher) {
      this._watcher.update();
    }
  }

  /**
   * 挂载
   * @param { egret.DisplayObjectContainer } parent 挂载对象
   * @return { Component }
   */
  public $mount(parent: egret.DisplayObjectContainer) {
    if (parent instanceof egret.DisplayObjectContainer && this.$el) {
      parent.addChild(this.$el);
    }
    return this;
  }
  /**
   * 销毁
   * @description 销毁对象
   * @author Hsuna
   */
  public $destroy() {
    if (this._isBeingDestroyed) return;

    this.$callHook('beforeDestroy');
    this._isBeingDestroyed = true;

    // 从parent列表中移除
    if (this.$parent && !this.$parent._isBeingDestroyed) {
      const index = this.$parent.$children.indexOf(this);
      if (index > -1) this.$parent.$children.splice(index, 1);
    }

    // 销毁观察器
    if (this._watcher) {
      this._watcher.teardown();
      this._watcher = null;
      this._watchers = null;
    }

    // 销毁渲染器
    if (this._render) {
      this._render.destroy();
      this._render = null;
    }

    // 销毁内部事件
    if (this._events) {
      this._events = null;
    }

    this._isDestroyed = true;

    this.$callHook('destroyed');
  }
  /**
   * 通过挂载名或者组件，获取实际的显示对象
   * @param { ComponentRef } ref 显示对象名
   * @param { boolean } isAll 是否返回全部，如果选是，则返回数组对象
   * @return { TArray<egret.DisplayObject> }
   */
  public $displayObject(ref: ComponentRef, isAll?: boolean): TArray<egret.DisplayObject> {
    if ('string' === typeof ref) {
      // 挂载名
      const refs = this.$refs[ref];
      if (Array.isArray(refs)) {
        if (isAll)
          return refs.map((ref: RefData) => this.$displayObject(ref) as egret.DisplayObject);
        return this.$displayObject(refs[0]);
      }
      return this.$displayObject(refs);
    } else if (ref instanceof Component) {
      // 组件
      return (ref as Component).$el;
    } else if (ref instanceof egret.DisplayObject) {
      // 显示对象本身
      return ref as egret.DisplayObject;
    }
    return null;
  }
  /**
   * 碰撞检测
   * @description 用于检测两个显示对象间是否存在碰撞
   * @author Hsuna
   * @param { ComponentRef } ref1 显示对象1
   * @param { ComponentRef } ref2 显示对象2
   * @return { boolean }
   */
  public $hitTest(ref1: ComponentRef, ref2: ComponentRef): boolean {
    const disObj1 = this.$displayObject(ref1) as egret.DisplayObject;
    const disObj2 = this.$displayObject(ref2) as egret.DisplayObject;
    if (!disObj1 || !disObj2) return true;
    const rect1: egret.Rectangle = disObj1.getBounds();
    const rect2: egret.Rectangle = disObj2.getBounds();
    (rect1.x = disObj1.x), (rect1.y = disObj1.y);
    (rect2.x = disObj2.x), (rect2.y = disObj2.y);
    return rect1.intersects(rect2);
  }
  /**
   * 坐标点碰撞检测
   * @description 用于检测坐标点是否在对象内
   * @author Hsuna
   * @param { ComponentRef } ref 显示对象
   * @param { number } x 坐标X
   * @param { number } y 坐标Y
   * @param { boolean } shapeFlag 是否采用像素值检测
   * @return { boolean }
   */
  public $hitTestPoint(ref: ComponentRef, x: number, y: number, shapeFlag?: boolean): boolean {
    const disObj = this.$displayObject(ref) as egret.DisplayObject;
    return disObj ? disObj.hitTestPoint(x, y, shapeFlag) : false;
  }
  /**
   * 将全局坐标转化为本地坐标
   * @param { ComponentRef } ref 显示对象
   * @param { number } stateX  全局坐标X
   * @param { number } stateY  全局坐标Y
   * @return { egret.Point } 本地坐标
   */
  public $globalToLocal(ref: ComponentRef, stateX: number, stateY: number): egret.Point {
    const disObj = this.$displayObject(ref) as egret.DisplayObject;
    const resultPoint = new egret.Point(stateX, stateY);
    disObj && disObj.globalToLocal(stateX, stateY, resultPoint);
    return resultPoint;
  }
  /**
   * 将本地坐标转化为全局坐标
   * @param { ComponentRef } ref 显示对象
   * @param { number } localX  本地坐标X
   * @param { number } localY  本地坐标Y
   * @return { egret.Point } 全局坐标
   */
  public $localToGlobal(ref: ComponentRef, localX: number, localY: number): egret.Point {
    const disObj = this.$displayObject(ref) as egret.DisplayObject;
    const resultPoint = new egret.Point(localX, localY);
    disObj && disObj.localToGlobal(localX, localY, resultPoint);
    return resultPoint;
  }

  /**
   * 获取舞台信息
   * @return { egret.Stage }
   */
  public get $stage(): egret.Stage {
    return this._global.stage;
  }
  /**
   * 获取舞台宽度
   * @return { number }
   */
  public get $stageWidth(): number {
    return this._global.stage.stageWidth;
  }
  /**
   * 获取舞台高度
   * @return { number }
   */
  public get $stageHeight(): number {
    return this._global.stage.stageHeight;
  }
  public get $data(): Record<string, any> {
    return this._data;
  }
  public get $props(): Record<string, any> {
    return this._props;
  }
  /** 获取属性 */
  public get $attrs(): Record<string, any> {
    return this._parentOptions.attrs || emptyObject;
  }
  /** 获取事件 */
  public get $listeners(): Record<string, Function> {
    return this._parentOptions.listeners || emptyObject;
  }
}

/**
 * VueEgret类
 * @description
 * @author Hsuna
 */
export default class VueEgret extends Component {
  /** 版本号 */
  static version: string = process.env.VERSION;
  /** 组件库缓存 */
  static _components: Record<string, ComponentClass> = {};
  /** 指令缓存 */
  static _directives: Record<string, DirectiveOptions> = {};
  static set = set;
  static delete = del;
  static nextTick = nextTick;

  /**
   * 设置全局组件
   * @param { string } name 组件名 用于全局定义
   * @param { ComponentOptions } options 组件配置
   */
  static component(name: string, options: ComponentOptions): ComponentClass {
    if (options) return (VueEgret._components[name] = VueEgret.extend(options));
    return VueEgret._components[name];
  }
  /**
   * 设置全局指令
   */
  static directive(name: string, definition: DirectiveOptions | DirectiveHook): DirectiveOptions {
    if (definition)
      return (VueEgret._directives[name] =
        typeof definition === 'function' ? { bind: definition, update: definition } : definition);
    return VueEgret._directives[name];
  }
  /**
   * 通过配置，获取组件类型
   * @param { ComponentOptions } options
   */
  static extend(options: ComponentOptions | ComponentClass): ComponentClass {
    if ('function' === typeof options) return <ComponentClass>options;
    return class extends Component {
      static options: ComponentOptions = <ComponentOptions>options;
      constructor(parentOptions: ComponentParentOptions = {}) {
        super(<ComponentOptions>options, parentOptions);
      }
    };
  }
  /**
   * 通过配置，获取主类
   * 由于egret启动是需要实例化Main类
   * @param { ComponentOptions } options
   */
  static classMain(options: ComponentOptions): Function {
    return class extends egret.DisplayObjectContainer {
      public vm: Component;
      constructor() {
        super();
        this.vm = new (VueEgret.extend(options))();
        this.vm.$mount(this);
      }
    };
  }
  constructor(options: ComponentOptions) {
    super(options);
  }
}
