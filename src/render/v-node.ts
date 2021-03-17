/** 虚拟树 */
import { Component, TArray } from '../index';

export interface VNodeInvoker extends Function {
  fns: TArray<Function>;
}

export type VNodeModifiers = Record<string, boolean>;

export interface VNodeDirective {
  name: string;
  expression: string;
  value?: any;
  oldValue?: any;
  arg?: string;
  rawArg?: string;
  modifiers?: VNodeModifiers;
}

export interface VNode {
  vm?: Component;
  sp?: egret.DisplayObject;
  key: any;
  tag: string;
  ref?: string;
  refInFor?: boolean;
  parent?: VNode;
  children: Array<VNode>;
  props?: Record<string, any>;
  attrs: Record<string, any>;
  on: Record<string, VNodeInvoker>;
  nativeOn: Record<string, VNodeInvoker>;
  directives: Array<VNodeDirective>;
}

export function createVNode(tag: string, data: any = {}, children: Array<VNode> = []): VNode {
  if (Array.isArray(data)) children = data;
  const vnode: VNode = {
    ...data,
    tag,
    children: children.filter(Boolean),
  };
  vnode.children.forEach((child: VNode) => (child.parent = vnode));
  return vnode;
}

export function createFnInvoker(fns: TArray<Function>, thisObject?: any): VNodeInvoker {
  const invoker: VNodeInvoker = function (...args: Array<any>) {
    const { fns } = invoker;
    if (Array.isArray(fns)) {
      const cloned: Array<Function> = [...fns];
      let fn: Function = cloned.shift();
      while (fn) {
        // eslint-disable-next-line prefer-spread
        fn.apply(thisObject || this, args);
        fn = cloned.shift();
      }
    } else {
      // eslint-disable-next-line prefer-spread
      return fns.apply(thisObject || this, args);
    }
  };
  invoker.fns = fns;
  return invoker;
}
