/*
 * vue-egret 1.2.2
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

export interface PropData {
  type: Function;
  default?: any;
  required?: boolean;
  validator?: Function;
}

export interface ComponentClass {
  options: ComponentOptions;
  new (parentOptions?: ComponentParentOptions);
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
}

/** 类型-注册信息 */
export type ComponentRef = string | Component | egret.DisplayObject;

/** 组件矩形 */
export interface ComponentRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class ComponentEvent extends egret.Event {
  public data: any;
  constructor(type: string, data: any, bubbles = false, cancelable = false) {
    super(type, bubbles, cancelable);
    this.data = data;
  }
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
  $refs: Record<string, egret.DisplayObject | Component> = {};
  /** 组件配置 */
  $options: ComponentOptions;

  // 全局方法
  /** 设置对象的 property */
  $set = set;
  /** 删除对象的 property */
  $delete = del;

  private __nextTickCall: Array<Function> = [];

  // private __tickHandler: ComponentMap<Function> = [];
  private _global: Record<string, any> = {};
  private _data: Record<string, any> = {};
  private _props: Record<string, Array<string> | Record<string, PropData | Function>> = {};
  private _hasHookEvent = false;

  // 状态值
  private _isMounted = false;
  private _isBeingDestroyed = false;
  private _isDestroyed = false;

  public _isVue = true;
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
    this._tick();
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
            this._tick();
            if (this._isMounted) this.$callHook('update');
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
      this[e] = methods[e];
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
      handler = this[handler];
    }
    return this.$watch(expOrFn, handler, options);
  }
  private _tick() {
    while (this.__nextTickCall.length > 0) {
      const callback: Function = this.__nextTickCall.shift();
      if ('function' === typeof callback) callback();
    }
  }
  public $on(event: string | Array<string>, fn: Function): Component {
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
  public $once(event: string | Array<string>, fn: Function): Component {
    const on: any = (...args) => {
      this.$off(event, on);
      return fn.apply(this, args);
    };
    on.fn = fn;
    this.$on(event, on);
    return this;
  }
  public $off(event: string | Array<string>, fn: Function): Component {
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
  public $callHook(name: string, ...rest) {
    // 阻断所有数据变动
    pushTarget();
    if ('function' === typeof this.$options[name]) {
      this.$options[name].call(this, ...rest);
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
  /*
   * 下一帧
   */
  public $nextTick(callback: Function) {
    if (callback) {
      this.__nextTickCall.push(callback);
    } else {
      return new Promise((resolve) => this.__nextTickCall.push(resolve));
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
   * @return { egret.DisplayObject }
   */
  public $displayObject(ref: ComponentRef): egret.DisplayObject {
    if ('string' === typeof ref) {
      // 挂载名
      return this.$displayObject(this.$refs[ref]);
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
    const disObj1: egret.DisplayObject = this.$displayObject(ref1);
    const disObj2: egret.DisplayObject = this.$displayObject(ref2);
    if (!disObj1 || !disObj2) return true;
    const rect1: egret.Rectangle = disObj1.getBounds();
    const rect2: egret.Rectangle = disObj2.getBounds();
    (rect1.x = disObj1.x), (rect1.y = disObj1.y);
    (rect2.x = disObj2.x), (rect2.y = disObj2.y);
    return rect1.intersects(rect2);
  }
  /**
   * 矩形碰撞检测
   * @description 用于检测两个矩形对象间是否存在碰撞
   * @author Hsuna
   * @param { ComponentRect } rect1 矩形对象1
   * @param { ComponentRect } rect2 矩形对象2
   * @return { boolean }
   */
  public $hitTestRect(rect1: ComponentRect, rect2: ComponentRect): boolean {
    if (!rect1 || !rect2) return true;
    rect1 =
      rect1 instanceof egret.Rectangle
        ? rect1
        : new egret.Rectangle(rect1.x, rect1.y, rect1.width, rect1.height);
    rect2 =
      rect2 instanceof egret.Rectangle
        ? rect2
        : new egret.Rectangle(rect2.x, rect2.y, rect2.width, rect2.height);
    return (rect1 as egret.Rectangle).intersects(rect2 as egret.Rectangle);
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
    const disObj: egret.DisplayObject = this.$displayObject(ref);
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
    const disObj: egret.DisplayObject = this.$displayObject(ref);
    const resultPoint: egret.Point = new egret.Point(stateX, stateY);
    disObj && disObj.globalToLocal(stateX, stateY, resultPoint);
    return resultPoint;
  }
  /**
   * 将本地坐标转化为全局坐标
   * @param { ComponentRef } ref 显示对象
   * @param { number } stateX  本地坐标X
   * @param { number } stateY  本地坐标Y
   * @return { egret.Point } 全局坐标
   */
  public $localToGlobal(ref: ComponentRef, stateX: number, stateY: number): egret.Point {
    const disObj: egret.DisplayObject = this.$displayObject(ref);
    const resultPoint: egret.Point = new egret.Point(stateX, stateY);
    disObj && disObj.localToGlobal(stateX, stateY, resultPoint);
    return resultPoint;
  }
  /**
   * 获取Tween对象
   * @description 用于检测egret.Tween是否被安装，且空值时，返回this的Tween
   * @author Hsuna
   * @param {egret.Tween} tween 可选，若不为Tween类型，则返回egret.Tween.get(this, ...arguments)
   * @return {egret.Tween}
   */
  public $tween(tween?: egret.Tween): egret.Tween {
    if ('Tween' in egret)
      return tween instanceof egret.Tween ? tween : egret.Tween.get(this, ...arguments);
    else throw 'The egret.Tween.js not import!!!';
  }
  /**
   * 简单运动动画
   * @description 仅适用于to函数，复杂的动画效果请使用原egret.Tween结合$tweenPromise实现
   * @author Hsuna
   * @param { any } props 对象的属性集合
   * @param { number } duration 持续时间
   * @param { Function } ease 缓动算法
   * @return {Promise<egret.Tween>}
   */
  public $tweenTo(props: any, duration?: number, ease?: Function): Promise<egret.Tween> {
    return this.$tweenPromise(this.$tween().to(props, duration, ease));
  }
  /**
   * 简单等待动画
   * @description 仅适用于wait函数，复杂的动画效果请使用原egret.Tween结合$tweenPromise实现
   * @author Hsuna
   * @param { number } duration 持续时间
   * @param { boolean } passive 等待期间属性是否会更新
   * @return {Promise<egret.Tween>}
   */
  public $tweenWait(duration: number, passive?: boolean): Promise<egret.Tween> {
    return this.$tweenPromise(this.$tween().wait(duration, passive));
  }
  /**
   * 动画Promise包装
   * @description 将Tween.call包装为Promise的方式
   * @author Hsuna
   * @param {egret.Tween} tween
   * @return {Promise<egret.Tween>}
   */
  public $tweenPromise(tween: egret.Tween): Promise<egret.Tween> {
    return new Promise((resolve: (value: egret.Tween) => void) => tween.call(resolve));
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
    return this._global.stage.width;
  }
  /**
   * 获取舞台高度
   * @return { number }
   */
  public get $stageHeight(): number {
    return this._global.stage.height;
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
