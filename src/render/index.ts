import VueEgret, { Component, ComponentClass, ComponentParentOptions, RefData } from '../index';
import { isUndef, toNumber, toString, looseEqual, looseIndexOf, hasOwn } from '../util';
import { createVNode, createFnInvoker, VNode, VNodeInvoker, VNodeDirective } from './v-node';
import { renderList, bindObjectProps, bindObjectListeners, prependModifier } from './helpers';
import { pushTarget, popTarget } from '../observer/dep';
import { astStrRender } from '../helpers/render';
import { DirectiveOptions, normalizeDirectives } from '../directives';
import { EventParseResult, parseEvent } from './util';

function ev(data: Record<string, any>, str = '') {
  const arr = str.split('.');
  for (const key of arr) {
    if (data[key]) data = data[key];
    else return null;
  }
  return data;
}

export function installRender(target: any) {
  target._c = createVNode;
  target._n = toNumber;
  target._s = toString;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._l = renderList;
  target._b = bindObjectProps;
  target._g = bindObjectListeners;
  target._p = prependModifier;
  // 返回render创建方法
  target.$createVNode = createVNode;
}

const DEFAULT_ATTR = '__VUE_EGRET_DEFAULT__';
/**
 * 渲染器
 * @author Hsuna
 */
export default class Render {
  /** VM对象 */
  private _vm: Component;
  /** 虚拟节点 */
  private _vnode: VNode;
  /** 渲染方法 */
  private _render: (
    createVNode: (tag: string, data: any, children: VNode[], normalizationType: number) => VNode,
  ) => VNode;
  /** 组件库 */
  private _components: Record<string, ComponentClass>;
  /** 指令库 */
  private _directives: Record<string, DirectiveOptions>;
  /** 新虚拟节点 */
  // private _newVnode:VNode;

  constructor(vm: Component) {
    this._vm = vm;
    this._components = Object.assign({}, VueEgret._components, this._vm._components);
    this._directives = Object.assign({}, VueEgret._directives, this._vm._directives);
    this._init();
  }

  private _init() {
    // 安装渲染器AST运行方法
    installRender(this._vm);

    this._render =
      'function' === typeof this._vm.$options.render // 如果存在渲染器这渲染，否则渲染模板
        ? this._vm.$options.render
        : Function.prototype.constructor(astStrRender(this._vm.$options.template));
    this._tick();
  }

  private _tick() {
    if (this._vm) {
      const newVNode: VNode = this._createVNode();
      this._vnode = this._patch(this._vnode, newVNode);
    }
  }

  public inserted() {
    // 触发指令：被绑定元素插入父节点时调用
    this._triggerDirective('inserted', this._vnode);
  }

  public update() {
    this._tick();
  }

  public destroy() {
    this._vnode && this._destroyDisObj(this._vnode);
    this._vm = null;
  }

  /**
   *
   * @param { VNode } oldVNode
   * @param { VNode } newVNode
   * @return { VNode }
   */
  private _patch(oldVNode: VNode, newVNode: VNode): VNode {
    if (!oldVNode) {
      //如果不存在旧节点的情况下，说明还未初始化，则初始化页面
      // 创建新节点
      this._vm.$el = this._createDisObj(newVNode);
    } else if (this._sameVNode(oldVNode, newVNode)) {
      //相似节点采用更新的方式
      this._patchVNode(oldVNode, newVNode);
    } else {
      //非相似节点直接替换
      // 获取父节点
      const parent: egret.DisplayObjectContainer = oldVNode.parent
        .sp as egret.DisplayObjectContainer;
      if (parent) {
        // 创建新节点
        const sp: egret.DisplayObject = this._createDisObj(newVNode);
        parent.addChildAt(sp, parent.getChildIndex(oldVNode.sp));
        this._destroyDisObj(oldVNode);
      }
    }
    return newVNode;
  }

  /**
   * 比较替换新旧节点
   * @param { VNode } oldVNode
   * @param { VNode } newVNode
   */
  private _patchVNode(oldVNode: VNode, newVNode: VNode) {
    newVNode.sp = oldVNode.sp;
    newVNode.vm = oldVNode.vm;
    this._updateDisObj(oldVNode, newVNode);
  }

  /**
   * 通过diff算法，最小粒度更新节点
   * @param { Array<VNode> } oldCh 虚拟节点旧子列表
   * @param { Array<VNode> } newCh 虚拟节点新子列表
   * @param { egret.DisplayObjectContainer } parent 节点显示对象
   */
  private _updateChildren(
    oldCh: Array<VNode>,
    newCh: Array<VNode>,
    parent: egret.DisplayObjectContainer,
  ) {
    if (oldCh === newCh) return;
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx: number = oldCh.length - 1;
    let newEndIdx: number = newCh.length - 1;
    let oldStartVNode: VNode = oldCh[0];
    let oldEndVNode: VNode = oldCh[oldEndIdx];
    let newStartVNode: VNode = newCh[0];
    let newEndVNode: VNode = newCh[newEndIdx];

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (!oldStartVNode) {
        oldStartVNode = oldCh[++oldStartIdx];
      } else if (!oldEndVNode) {
        oldEndVNode = oldCh[--oldEndIdx];
      } else if (this._sameVNode(oldStartVNode, newStartVNode)) {
        // 头部节点相似，头部指针移动
        this._patchVNode(oldStartVNode, newStartVNode);
        oldStartVNode = oldCh[++oldStartIdx];
        newStartVNode = newCh[++newStartIdx];
      } else if (this._sameVNode(oldEndVNode, newEndVNode)) {
        // 底部节点相似，底部指针移动
        this._patchVNode(oldEndVNode, newEndVNode);
        oldEndVNode = oldCh[--oldEndIdx];
        newEndVNode = newCh[--newEndIdx];
      } else {
        let sp: egret.DisplayObject;
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          if (this._sameVNode(newStartVNode, oldCh[i])) {
            // 查找旧显示列表是否有与当前位置相似的新节点
            this._patchVNode(oldCh[i], newStartVNode);
            // 将相似的旧节点插入到新节点对应位置
            // 修改显示对象位置
            sp = newStartVNode.sp;
            parent.setChildIndex(sp, newStartIdx);
            // 修改虚拟节点位置
            const oldVNode: VNode = oldCh.splice(i, 1)[0];
            oldCh.splice(newStartIdx, 0, oldVNode);
            oldStartVNode = oldCh[++oldStartIdx];
            break;
          }
        }
        if (!sp) {
          sp = this._createDisObj(newStartVNode);
          parent.addChildAt(sp, newStartIdx);
        }

        newStartVNode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      // 新增缺少的显示对象列表
      let sp: egret.DisplayObject;
      for (; newStartIdx <= newEndIdx; ++newStartIdx) {
        newStartVNode = newCh[newStartIdx];
        sp = this._createDisObj(newStartVNode);
        parent.addChildAt(sp, newStartIdx);
      }
    } else if (newStartIdx > newEndIdx) {
      // 删除多余的显示对象列表
      for (; oldStartIdx <= oldEndIdx; ++oldStartIdx) {
        oldStartVNode = oldCh[oldStartIdx];
        this._destroyDisObj(oldStartVNode);
      }
    }
  }

  /**
   * 获取虚拟节点
   * @return { VNode }
   */
  private _createVNode(): VNode {
    return this._render.call(this._vm, createVNode);
  }

  /**
   * 判断新旧节点是否一致
   * @param { VNode } oldVNode 旧节点
   * @param { VNode } newVNode 新节点
   * @return { boolean }
   */
  private _sameVNode(oldVNode: VNode, newVNode: VNode): boolean {
    return (
      oldVNode.key === newVNode.key && // VM实例时生成的key值
      oldVNode.tag === newVNode.tag && // 类名
      (oldVNode.attrs || {}).key === (newVNode.attrs || {}).key // 属性key值，当属性使用key时，进行强制比对，特别是循环列表，进行强制替换
    );
  }

  /**
   * 创建新的显示对象
   * @param { VNode } vnode 对象虚拟节点
   * @return { egret.DisplayObject } 返回新的显示对象
   */
  private _createDisObj(vnode: VNode): egret.DisplayObject {
    let VClass: ComponentClass = this._components[vnode.tag];
    pushTarget(); //阻断所有更新监听
    // Component
    if (VClass) {
      const parentOptions: ComponentParentOptions = {
        parent: this._vm,
        propsData: {},
        _propsKeys: [],
        attrs: {},
        listeners: {},
      };
      const props: Record<string, any> = VClass.options.props;
      for (const key in props) {
        parentOptions._propsKeys.push(key);
        if (hasOwn(this._vm.$props, key)) parentOptions.propsData[key] = this._vm.$props[key];
        if (hasOwn(vnode.attrs, key)) parentOptions.propsData[key] = vnode.attrs[key];
      }
      for (const key in vnode.attrs) {
        if (!hasOwn(parentOptions.propsData, key)) parentOptions.attrs[key] = vnode.attrs[key];
      }
      // 创建虚拟dom节点
      vnode.vm = new VClass(parentOptions);
      // 将实际显示对象关联虚拟节点
      vnode.sp = vnode.vm.$el;

      // 新增组件内部事件
      for (const type in vnode.on) {
        parentOptions.listeners[type] = vnode.on[type] = this._addInvoker(type, vnode);
      }
      // 新增原生事件
      for (const type in vnode.nativeOn) {
        vnode.nativeOn[type] = this._addInvoker(type, vnode, true);
      }
      // 如果inheritAttrs不为false，则禁用 Attribute 继承
      if (false !== vnode.vm.$options.inheritAttrs) {
        this._addAttrs(vnode, parentOptions.attrs);
      }
    } else {
      VClass = (egret as any)[vnode.tag] || ev(window, vnode.tag);
      if (VClass) {
        vnode.sp = new (<any>VClass)();

        for (const type in vnode.on) {
          vnode.on[type] = this._addInvoker(type, vnode);
        }

        this._addAttrs(vnode, vnode.attrs);
      }
    }
    if (!VClass) throw new Error(`Then [${vnode.tag}] Node is undefined!!!`);

    // 实例节点
    if (vnode.ref) {
      const refs = this._vm.$refs;
      const ref: RefData = vnode.vm || vnode.sp;
      if (vnode.refInFor) {
        if (!Array.isArray(refs[vnode.ref])) {
          refs[vnode.ref] = [ref];
        } else if ((refs[vnode.ref] as Array<RefData>).indexOf(ref) < 0) {
          (refs[vnode.ref] as Array<RefData>).push(ref);
        }
      } else {
        refs[vnode.ref] = ref;
      }
    }
    // 触发指令：只调用一次，指令第一次绑定到元素时调用
    this._triggerDirective('bind', vnode);

    vnode.children.forEach((child: VNode) => {
      (vnode.sp as egret.DisplayObjectContainer).addChild(this._createDisObj(child));
    });
    popTarget();
    return vnode.sp;
  }

  /**
   * 更新显示对象
   * @param { VNode } oldVNode 旧虚拟节点
   * @param { VNode } newVNode 新虚拟节点
   */
  private _updateDisObj(oldVNode: VNode, newVNode: VNode) {
    if (oldVNode.vm) {
      // 更新继承属性
      for (const key in oldVNode.vm.$props) {
        if (hasOwn(this._vm.$props, key)) oldVNode.vm.$props[key] = this._vm.$props[key]; // bug：1.1.6 属性优先级错误，导致继承失败
        if (hasOwn(newVNode.attrs, key)) oldVNode.vm.$props[key] = newVNode.attrs[key];
      }
      const parentOptions: ComponentParentOptions = oldVNode.vm._parentOptions;
      const oldParentAttrs: Record<string, any> = parentOptions.attrs;
      parentOptions.attrs = [];
      for (const key in newVNode.attrs) {
        if (!hasOwn(oldVNode.vm.$props, key)) parentOptions.attrs[key] = newVNode.attrs[key];
      }
      // 更新组件事件
      for (const type in newVNode.on) {
        parentOptions.listeners[type] = oldVNode.on[type] = newVNode.on[type] = this._updateInvoker(
          type,
          oldVNode,
          newVNode,
        );
      }
      for (const type in oldVNode.on) {
        if (isUndef(newVNode.on[type])) {
          this._removeInvoker(type, oldVNode);
        }
      }
      // 更新原生事件
      for (const type in newVNode.nativeOn) {
        oldVNode.nativeOn[type] = newVNode.nativeOn[type] = this._updateInvoker(
          type,
          oldVNode,
          newVNode,
          true,
        );
      }
      for (const type in oldVNode.nativeOn) {
        if (isUndef(newVNode.nativeOn[type])) {
          this._removeInvoker(type, oldVNode, true);
        }
      }
      // 如果inheritAttrs不为false，则禁用 Attribute 继承
      if (false !== oldVNode.vm.$options.inheritAttrs) {
        this._updateAttrs(oldVNode, oldParentAttrs, parentOptions.attrs);
      }
    } else {
      // 如果是原生类，则直接更新原生事件
      for (const type in newVNode.on) {
        oldVNode.on[type] = this._updateInvoker(type, oldVNode, newVNode);
      }
      for (const type in oldVNode.on) {
        if (isUndef(newVNode.on[type])) {
          this._removeInvoker(type, oldVNode);
        }
      }
      // 更新属性
      this._updateAttrs(oldVNode, oldVNode.attrs, newVNode.attrs);
    }

    // 触发指令：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前
    this._triggerDirective('update', newVNode, oldVNode);

    // 更新子集
    this._updateChildren(
      oldVNode.children,
      newVNode.children,
      newVNode.sp as egret.DisplayObjectContainer,
    );
    // 触发指令：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
    this._triggerDirective('componentUpdated', newVNode, oldVNode);
  }

  /**
   * 通过虚拟节点销毁显示对象
   * @param { VNode } vnode
   * @return { VNode } 返回销毁的虚拟节点
   */
  private _destroyDisObj(vnode: VNode): VNode {
    if (vnode.vm) vnode.vm.$callHook('beforeDestroyed');

    if (vnode.sp) {
      // 触发指令
      this._triggerDirective('unbind', vnode);

      // 通过获取父节点，移除显示对象
      vnode.parent &&
        vnode.parent.sp &&
        (vnode.parent.sp as egret.DisplayObjectContainer).removeChild(vnode.sp);
      // 移除组件事件

      if (!vnode.vm) {
        for (const type in vnode.on) {
          this._removeInvoker(type, vnode, false);
        }
      }

      // 移除原生事件
      for (const type in vnode.nativeOn) {
        this._removeInvoker(type, vnode, true);
      }
    }
    // 触发销毁方法，不在此处销毁，由vm内处理销毁
    // if(vnode.vm) vnode.vm.$destroy()

    // 移除各项示例挂载
    if (vnode.ref) {
      delete this._vm.$refs[vnode.ref];
    }
    // 递归子对象，进行销毁
    vnode.children.forEach((vnode: VNode) => this._destroyDisObj(vnode));
    return vnode;
  }

  /**
   * 新增属性
   * @param { VNode } 虚拟节点
   * @param { Record<string, any> } attrs 属性组
   */
  private _addAttrs(vnode: VNode, attrs: Record<string, any>): void {
    if (!hasOwn(vnode.sp, DEFAULT_ATTR)) (vnode.sp as any)[DEFAULT_ATTR] = {};
    for (const name in attrs) {
      (vnode.sp as any)[DEFAULT_ATTR][name] = (vnode.sp as any)[name];
      (vnode.sp as any)[name] = attrs[name];
    }
  }

  /**
   * 更新属性
   * @param { VNode } 虚拟节点
   * @param { Record<string, any> } oldAttrs 旧属性组
   * @param { Record<string, any> } newAttrs 新属性组
   */
  private _updateAttrs(
    vnode: VNode,
    oldAttrs: Record<string, any>,
    newAttrs: Record<string, any>,
  ): void {
    for (const name in newAttrs) {
      if (oldAttrs[name] !== newAttrs[name]) {
        if (!hasOwn((vnode.sp as any)[DEFAULT_ATTR], name)) {
          (vnode.sp as any)[DEFAULT_ATTR][name] = (vnode.sp as any)[name];
        }
        (vnode.sp as any)[name] = newAttrs[name];
      }
    }
    for (const name in oldAttrs) {
      if (isUndef(newAttrs[name])) {
        (vnode.sp as any)[name] = (vnode.sp as any)[DEFAULT_ATTR][name];
      }
    }
  }

  /**
   * 新增事件对象
   * @param { string } type 事件类型
   * @param { VNode } 虚拟节点
   * @param { boolean } isNative 是否原生事件
   * @return { VNodeInvoker } 事件对象
   */
  private _addInvoker(type: string, vnode: VNode, isNative = false): VNodeInvoker {
    const prefix: string = isNative ? 'nativeOn' : 'on';
    const event: EventParseResult = parseEvent(type);
    let on: VNodeInvoker = (vnode as any)[prefix][type];
    if (isUndef(on.fns)) {
      on = createFnInvoker(on, this._vm);
    }
    if (!vnode.vm || isNative) {
      vnode.sp[event.once ? 'once' : 'addEventListener'](event.name, on, this._vm, event.capture);
    } else {
      vnode.vm[event.once ? '$once' : '$on'](event.name, on);
    }
    return on;
  }
  /**
   * 更新事件对象
   * @param { string } type 事件类型
   * @param { VNode } oldVNode 旧虚拟节点
   * @param { VNode } newVNode 新虚拟节点
   * @param { boolean } isNative 是否原生事件
   * @return { VNodeInvoker } 事件对象
   */
  private _updateInvoker(
    type: string,
    oldVNode: VNode,
    newVNode: VNode,
    isNative = false,
  ): VNodeInvoker {
    const prefix: string = isNative ? 'nativeOn' : 'on';
    const oldOn: VNodeInvoker = (oldVNode as any)[prefix][type];
    const newOn: VNodeInvoker = (newVNode as any)[prefix][type];
    if (isUndef(newOn)) {
      // TODO
    } else if (isUndef(oldOn)) {
      return this._addInvoker(type, newVNode, isNative);
    } else if (newOn !== oldOn) {
      //事件不一样的，直接替换内部执行函数
      oldOn.fns = newOn;
      return oldOn;
    }
  }

  /**
   * 移除事件对象
   * @param { string } type 事件类型
   * @param { VNode } 虚拟节点
   * @param { boolean } isNative 是否原生事件
   * @return { VNodeInvoker } 事件对象
   */
  private _removeInvoker(type: string, vnode: VNode, isNative = false): VNodeInvoker {
    const on: VNodeInvoker = isNative ? vnode.nativeOn[type] : vnode.on[type];
    const event: EventParseResult = parseEvent(type);

    if (!vnode.vm || isNative) {
      vnode.sp.removeEventListener(event.name, on, this._vm, event.capture);
    } else {
      vnode.vm.$off(event.name, on);
    }
    return on;
  }

  /**
   * 触发指令
   * @param { string } hook 钩子函数：bind | inserted | update | componentUpdated | unbind
   * @param { VNode } vnode 虚拟节点
   * @param { VNode } oldVnode 旧虚拟节点
   */
  private _triggerDirective(hook: string, vnode: VNode, oldVnode?: VNode) {
    if (vnode.directives) {
      const oldDir: Record<string, VNodeDirective> =
        oldVnode && normalizeDirectives(oldVnode.directives);
      for (const dir of vnode.directives) {
        const directive: DirectiveOptions = this._directives[dir.name];
        if (directive && (directive as any)[hook]) {
          const binding: VNodeDirective = { ...dir };
          if (oldDir) {
            if (hasOwn(oldDir[dir.name], 'value')) binding['oldValue'] = oldDir[dir.name].value;
            if (hasOwn(oldDir[dir.name], 'arg')) binding['oldArg'] = oldDir[dir.arg].value;
          }
          (directive as any)[hook].apply(
            this._vm,
            [vnode.sp, binding].concat(Array.prototype.slice.call(arguments, 1)),
          );
        }
      }
    }
  }

  /* public get vnode():VNode{
    return this._vnode;
  } */
}
