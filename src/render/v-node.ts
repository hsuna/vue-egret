/** 虚拟树 */
import { ASTNode, ASTAttr } from './ast-node';
import { ForParseResult } from '../helpers';
import { Component } from '../index';

const REF_REG = /^(:?ref)/;
const BIND_REG = /^(v-bind:|:)/;
const ON_REG = /^(v-on:|@)/;
const TEXT_REG = /\{\{([^}]+)\}\}/g;

const fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/;
const simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

export interface Variate {
  [varName: string]: string;
}

export interface Invoker extends Function {
  fns: Function | Array<Function>;
}

export interface VNode {
  vm?: Component;
  sp?: egret.DisplayObject;
  key: any;
  tag: string;
  ref: string;
  parent?: VNode;
  children: Array<VNode>;
  attrs: Record<string, any>;
  props: Record<string, any>;
  on: Record<string, Invoker>;
  nativeOn: Record<string, Invoker>;
}

export function genAttr(ast: ASTNode): string {
  let ref = '',
    attrs = '',
    on = '',
    nativeOn = '';
  ast.attrsList.forEach((attr: ASTAttr) => {
    if (REF_REG.test(attr.name)) {
      ref = /^(:)/.test(attr.name) ? `${attr.value}` : `"${attr.value}"`;
    } else if (BIND_REG.test(attr.name)) {
      const [name, ...modifiers] = attr.name.replace(BIND_REG, '').split('.');
      attrs += `"${name}":_n(${attr.value}),`;
    } else if (ON_REG.test(attr.name)) {
      const [name, ...modifiers] = attr.name.replace(ON_REG, '').split('.');
      if (~modifiers.indexOf('native')) {
        nativeOn += `"${name}":${genHandler(attr.value)},`;
      } else {
        on += `"${name}":${genHandler(attr.value)},`;
      }
    } else {
      attrs += `"${attr.name}":_n("${attr.value}"),`;
    }
  });
  if (ast.text) {
    attrs += `text:${genText(ast)},`;
  }
  return `{attrs:{${attrs}},on:{${on}},nativeOn:{${nativeOn}}${ref ? `,ref:${ref}` : ''}}`;
}

export function genText(ast: ASTNode): string {
  return `_s("${ast.text.replace(TEXT_REG, (_: any, expOrFn: string) => `"+(${expOrFn})+"`)}")`;
}

export function genHandler(exp: string): string {
  if (simplePathRE.test(exp) || fnExpRE.test(exp)) {
    return exp;
  }
  return `function($event){${exp}}`;
}

export function genVNode(ast: ASTNode, isCheck = true): string {
  const forRes: ForParseResult = ast.processMap.for;
  if (isCheck && forRes && forRes.for) {
    return `_l((${forRes.for}), function(${[forRes.alias, forRes.iterator1, forRes.iterator2]
      .filter(Boolean)
      .join(',')}){return ${genVNode(ast, false)}})`;
  } else if (isCheck && ast.processMap.ifConditions) {
    return (
      '(' +
      ast.processMap.ifConditions
        .map(
          ({ exp, target }: { exp: string; target: ASTNode }) =>
            `${exp}?${genVNode(target, false)}:`,
        )
        .join('') +
      '"")'
    );
  } else {
    return `_c("${ast.tag}",${genAttr(ast)}${
      ast.children.length > 0
        ? `,[].concat(${ast.children.map((ast: ASTNode) => genVNode(ast))})`
        : ''
    })`;
  }
}

export function createVNode(tag: string, data: any = {}, children: Array<VNode> = []): VNode {
  if (Array.isArray(data)) children = data;
  const vnode: VNode = {
    key: data && data.key,
    tag,
    ref: data.ref || '',
    children: children.filter(Boolean),
    attrs: data.attrs || {},
    props: {},
    on: data.on || {},
    nativeOn: data.nativeOn || {},
  };
  vnode.children.forEach((child: VNode) => (child.parent = vnode));
  return vnode;
}

export function createFnInvoker(fns: Function | Array<Function>) {
  const invoker: Invoker = function (...args: Array<any>) {
    const { fns } = invoker;
    if (Array.isArray(fns)) {
      const cloned: Array<Function> = [...fns];
      let fn: Function = cloned.shift();
      while (fn) {
        // eslint-disable-next-line prefer-spread
        fn.apply(this, args);
        fn = cloned.shift();
      }
    } else {
      // eslint-disable-next-line prefer-spread
      return fns.apply(this, args);
    }
  };
  invoker.fns = fns;
  return invoker;
}
