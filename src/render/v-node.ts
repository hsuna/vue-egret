/** 虚拟树 */
import { ASTNode, ASTAttr } from './ast-node';
import { ForParseResult } from '../helpers';
import { Component } from '../index';
import baseDirectives, { DirectiveFunction } from '../directives/index';

const DIR_REG = /^v-|^@|^:|^#/; // v-foo=
const SUGAR_REG = /^(:?(key|ref))/; // key= | ref=
const BIND_REG = /^(v-bind:|:)/; // v-bind:foo | :foo
const ON_REG = /^(v-on:|@)/; // v-on:type | @type
const TEXT_REG = /\{\{([^}]+)\}\}/g; // {{text}}
const DYNAMIC_ARG_RE = /^\[.*\]$/; // v-on:[arg]

const fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/;
const simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

const delComma = (str: string): string => str.replace(/,$/, '');

export interface VNodeInvoker extends Function {
  fns: Function | Array<Function>;
}

export type VNodeModifiers = Record<string, boolean>;

export interface VNodeDirective {
  name: string;
  expression: string;
  value?: any;
  oldValue?: any;
  arg?: string;
  modifiers?: VNodeModifiers;
}

export interface VNode {
  vm?: Component;
  sp?: egret.DisplayObject;
  key: any;
  tag: string;
  ref: string;
  parent?: VNode;
  children: Array<VNode>;
  props?: Record<string, any>;
  attrs: Record<string, any>;
  on: Record<string, VNodeInvoker>;
  nativeOn: Record<string, VNodeInvoker>;
  directives: Array<VNodeDirective>;
}

export interface AstData {
  key: any;
  tag: string;
  ref: string;
  attrs: Array<VNodeDirective>;
  on: Array<VNodeDirective>;
  nativeOn: Array<VNodeDirective>;
  directives: Array<VNodeDirective>;
  wrapDir?: Array<Function>;
}

export function parserAttrList(ast: ASTNode): AstData {
  const astData: AstData = {
    tag: ast.tag,
    key: '',
    ref: '',
    attrs: [],
    on: [],
    nativeOn: [],
    directives: [],
    wrapDir: [],
  };
  ast.attrsList.forEach((attr: ASTAttr) => {
    if (SUGAR_REG.test(attr.name)) {
      astData[attr.name.replace(SUGAR_REG, '$1')] = genAttrValue(attr.name, attr.value);
    } else if (DIR_REG.test(attr.name)) {
      const dir: VNodeDirective = createDirectives(attr.name, attr.value);
      if (BIND_REG.test(attr.name)) {
        astData.attrs.push(dir);
      } else if (ON_REG.test(attr.name)) {
        if (dir.modifiers.native) {
          astData.nativeOn.push(dir);
        } else {
          astData.on.push(dir);
        }
      } else {
        astData.directives.push(dir);
      }
    } else {
      astData.attrs.push({
        name: 'bind',
        arg: `"${attr.name}"`,
        expression: attr.value,
      });
    }
  });
  if (ast.text) {
    astData.attrs.push({
      name: 'bind',
      arg: `"text"`,
      expression: genText(ast),
    });
  }
  return astData;
}

export function genData(ast: ASTNode): string {
  const data: AstData = parserAttrList(ast);

  let str = '{';
  // directives first.
  if (data.directives && data.directives.length) {
    str += genDirectives(data.directives, data);
  }
  // key
  if (data.key) {
    str += `key:${data.key},`;
  }
  // ref
  if (data.ref) {
    str += `ref:${data.ref},`;
  }
  // attributes
  if (data.attrs && data.attrs.length) {
    str += `attrs:${genProps(data.attrs)},`;
  }
  // on
  if (data.on && data.on.length) {
    str += `on:${genHandlers(data.on)},`;
  }
  // nativeOn
  if (data.nativeOn && data.nativeOn.length) {
    str += `nativeOn:${genHandlers(data.nativeOn)},`;
  }
  str = delComma(str) + '}';

  if (data.wrapDir && data.wrapDir.length) {
    data.wrapDir.forEach((wrap: Function) => {
      str = wrap(str);
    });
  }
  return str;
}

export function genAttrValue(name: string, value: string): string {
  return /^(:)/.test(name) ? `${value}` : `"${value}"`;
}

export function genText(ast: ASTNode): string {
  return `_s("${ast.text.replace(TEXT_REG, (_: any, expOrFn: string) => `"+(${expOrFn})+"`)}")`;
}

export function genProps(dirs: Array<VNodeDirective>): string {
  let res = '';
  dirs.forEach((dir: VNodeDirective) => {
    res += `${dir.arg}:_n(${dir.expression}),`;
  });
  return res ? `{${delComma(res)}}` : '';
}

export function genHandlers(dirs: Array<VNodeDirective>): string {
  let res = '';
  dirs.forEach((dir: VNodeDirective) => {
    res += `${dir.arg}:${genHandler(dir.expression)},`;
  });
  return res ? `{${delComma(res)}}` : '';
}

export function genHandler(exp: string): string {
  if (simplePathRE.test(exp) || fnExpRE.test(exp)) {
    return exp;
  }
  return `function($event){${exp}}`;
}

export function genDirectives(dirs: Array<VNodeDirective>, astData: AstData): string {
  let res = '';
  dirs.forEach((dir: VNodeDirective) => {
    let needRuntime = true;
    const gen: DirectiveFunction = baseDirectives[dir.name];
    if (gen) {
      needRuntime = !!gen(astData, dir);
    }
    if (needRuntime) {
      res += `{name:"${dir.name}",value:_n(${dir.expression}),expression:"${dir.expression}"${
        dir.arg ? `,arg:"${dir.arg}"` : ''
      }${dir.modifiers ? `,modifiers:${JSON.stringify(dir.modifiers)}` : ''}},`;
    }
  });
  return res ? `directives:[${delComma(res)}],` : '';
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
    return `_c("${ast.tag}",${genData(ast)}${
      ast.children.length > 0
        ? `,[].concat(${ast.children.map((ast: ASTNode) => genVNode(ast))})`
        : ''
    })`;
  }
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

export function createFnInvoker(fns: Function | Array<Function>): VNodeInvoker {
  const invoker: VNodeInvoker = function (...args: Array<any>) {
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

export function createDirectives(directive: string, expression: string): VNodeDirective {
  let name = '',
    arg = '',
    modifiers: Array<string> = [];

  // @type => v-on:type, :type =>
  directive = directive.replace(BIND_REG, 'v-bind:').replace(ON_REG, 'v-on:');
  // v-my-directive:key.foo.bar => ['v-my-directive:key', 'foo', 'bar']
  [directive, ...modifiers] = directive.split('.');
  // 'v-my-directive:key' => ['v-my-directive', 'key']
  [name, arg] = directive.split(':');

  return {
    name: name.replace(DIR_REG, ''), // v-bind => bind
    expression,
    arg: arg ? (DYNAMIC_ARG_RE.test(arg) ? arg.slice(1, -1) : `"${arg}"`) : '',
    modifiers: modifiers.reduce((o, k) => Object.assign(o, { [k]: true }), {}), // ['foo', 'bar'] => {foo: true, bar: true}
  };
}
