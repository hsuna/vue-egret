import { AstData, parseModel, parseAttrList } from './util';
import { ForParseResult } from 'src/helpers';
import { ASTNode } from './ast-node';
import { VNodeDirective } from './v-node';
import baseDirectives, { DirectiveFunction } from '../directives/index';

const textRE = /\{\{([^}]+)\}\}/g; // {{text}}
const fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/;
const fnInvokeRE = /\([^)]*?\);*$/;
const simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

const delComma = (str: string): string => str.replace(/,$/, '');

export function genData(ast: ASTNode): string {
  const data: AstData = parseAttrList(ast);

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
  if (data.refInFor) {
    str += `refInFor:true,`;
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
    const isSync: boolean = 'sync' == dir.name;
    let isDynamic = false;
    let name = dir.arg;
    if (isSync) {
      name = `_p(${name}, "update:")`;
      isDynamic = true;
    }
    // check modifier
    if (dir.modifiers) {
      if (dir.modifiers.capture) {
        name = `_p(${name}, "!")`;
        isDynamic = true;
      }
      if (dir.modifiers.once) {
        name = `_p(${name}, "~")`;
        isDynamic = true;
      }
    }
    if (isDynamic) {
      name = `[${name}]`;
    }
    res += `${name}:${genHandler(dir, isSync)},`;
  });
  return res ? `{${delComma(res)}}` : '';
}

const genGuard = (condition: string) => `if(${condition})return null;`;
const modifierCode: Record<string, string> = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard(`$event.target !== $event.currentTarget`),
};

export function genHandler(dir: VNodeDirective, isSync?: boolean): string {
  const expression = (isSync ? genSync(dir.expression) : dir.expression) || '';
  const isMethodPath = simplePathRE.test(expression); // @touchTap="doSomething"
  const isFunctionExpression = fnExpRE.test(expression); // @touchTap="() => {}" or @touchTap="function(){}"
  const isFunctionInvocation = simplePathRE.test(expression.replace(fnInvokeRE, '')); // @touchTap="doSomething($event)"

  // 在没有修饰符的情况下
  if (!dir.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return expression;
    }

    return `function($event){${isFunctionInvocation ? `return ${expression}` : expression}}`;
  } else {
    let code = '';
    for (const key in dir.modifiers) {
      if (modifierCode[key]) {
        code += modifierCode[key];
      }
    }
    const handlerCode = isMethodPath
      ? `return ${expression}($event)`
      : isFunctionExpression
      ? `return (${expression})($event)`
      : isFunctionInvocation
      ? `return ${expression}`
      : expression;

    return `function($event){${code}${handlerCode}}`;
  }
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
  const forRes: ForParseResult = ast.for;
  if (isCheck && forRes && forRes.for) {
    return `_l((${forRes.for}), function(${[forRes.alias, forRes.iterator1, forRes.iterator2]
      .filter(Boolean)
      .join(',')}){return ${genVNode(ast, false)}})`;
  } else if (isCheck && ast.ifConditions) {
    return (
      '(' +
      ast.ifConditions
        .map(
          ({ exp, target }: { exp: string; target: ASTNode }) =>
            `${exp}?${genVNode(target, false)}:`,
        )
        .join('') +
      '"")'
    );
  } else {
    return `_c(${ast.component || `"${ast.tag}"`},${genData(ast)}${
      ast.children.length > 0
        ? `,[].concat(${ast.children.map((ast: ASTNode) => genVNode(ast))})`
        : ''
    })`;
  }
}
