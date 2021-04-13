/** 虚拟树 */
import { isObject } from 'src/util';
import VueEgret, { Component, ComponentClass, ComponentOptions, TArray } from '../index';

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
  oldArg?: string;
  rawArg?: string;
  modifiers?: VNodeModifiers;
}

export interface VNode {
  Ctrl?: ComponentClass;
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

export const SIMPLE_NORMALIZE = 1;
export const ALWAYS_NORMALIZE = 2;

export function normalizeChildren(children: Array<VNode> = []): Array<VNode> {
  return Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}

export function normalizeArrayChildren(children: Array<VNode> = []): Array<VNode> {
  return children.reduce((pre: Array<VNode>, vnode: VNode) => {
    return pre.concat(Array.isArray(vnode) ? normalizeArrayChildren(vnode) : vnode);
  }, []);
}

export function simpleNormalizeChildren(children: Array<VNode> = []): Array<VNode> {
  for (let i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }
  return children;
}

export function createVNode(
  tag: string | ComponentOptions | Function,
  data: any = {},
  children: Array<VNode> = [],
  normalizationType: number,
): VNode {
  if (Array.isArray(data)) {
    normalizationType = <any>children;
    children = data;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }

  let Ctrl: ComponentClass;
  if ('function' === typeof tag) {
    // async function: (resolve) => resolve(options);
  } else if (isObject(tag)) {
    Ctrl = VueEgret.extend(tag as ComponentOptions);
  }
  const vnode: VNode = {
    ...data,
    ...(Ctrl
      ? {
          Ctrl,
          tag: `vue-component-${Ctrl.cid}${data.name ? `-${data.name}` : ''}`,
        }
      : {
          tag,
        }),
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
