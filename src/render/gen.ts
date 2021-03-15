import { AstData, delComma, parseModel, parserAttrList } from './util';
import { ForParseResult } from 'src/helpers';
import { ASTNode } from './ast-node';
import { VNodeDirective } from './v-node';
import baseDirectives, { DirectiveFunction } from '../directives/index';
import { debounce } from 'src/util/helper';

const textRE = /\{\{([^}]+)\}\}/g; // {{text}}
const fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/;
const simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

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

export function genSync(expression: string): string {
  const res = parseModel(expression);
  if (res.key === null) {
    return `${expression}=$event`;
  } else {
    return `$set(${res.exp}, ${res.key}, $event)`;
  }
}

export function genAttrValue(name: string, value: string): string {
  return /^(:)/.test(name) ? `${value}` : `"${value}"`;
}

export function genText(text: string): string {
  return `_s("${text.replace(textRE, '"+($1)+"')}")`;
}

export function genProps(dirs: Array<VNodeDirective>): string {
  let res = '';
  dirs.forEach((dir: VNodeDirective) => {
    if ('text' === dir.name) {
      res += `${dir.rawArg || dir.arg}:${genText(dir.expression)},`;
    } else {
      res += `${dir.rawArg || dir.arg}:${dir.expression},`;
    }
  });
  return res ? `{${delComma(res)}}` : '';
}

export function genHandlers(dirs: Array<VNodeDirective>): string {
  let res = '';
  dirs.forEach((dir: VNodeDirective) => {
    if ('sync' == dir.name) {
      res += `["update:"+${dir.arg}]:${genHandler(genSync(dir.expression))},`;
    } else {
      res += `${dir.rawArg || dir.arg}:${genHandler(dir.expression)},`;
    }
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
        dir.arg ? `,arg:${dir.arg}` : ''
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
