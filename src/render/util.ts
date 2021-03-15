import { ASTAttr, ASTNode } from './ast-node';
import { genAttrValue } from './gen';
import { VNodeDirective } from './v-node';

export const DIR_REG = /^v-|^@|^:|^#/; // v-foo=
export const SUGAR_REG = /^(:?(key|ref))/; // key= | ref=
export const BIND_REG = /^(v-bind:|:)/; // v-bind:foo | :foo
export const ON_REG = /^(v-on:|@)/; // v-on:type | @type
export const DYNAMIC_ARG_RE = /^\[.*\]$/; // v-on:[arg]

export type ModelParseResult = {
  exp: string;
  key: string;
};

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

export const delComma = (str: string): string => str.replace(/,$/, '');

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
      const dir: VNodeDirective = parserDirective(attr.name, attr.value);
      if (BIND_REG.test(attr.name)) {
        astData.attrs.push(dir);
        if (dir.modifiers && dir.modifiers.sync) {
          astData.on.push({
            ...dir,
            name: 'sync',
          });
        }
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
        arg: attr.name,
        expression: `_n("${attr.value}")`,
      });
    }
  });
  if (ast.text) {
    astData.attrs.push({
      name: 'text',
      arg: `"text"`,
      expression: ast.text,
    });
  }
  return astData;
}

export function parserDirective(directive: string, expression: string): VNodeDirective {
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
    rawArg: arg || '',
    modifiers: modifiers.reduce((o, k) => Object.assign(o, { [k]: true }), {}), // ['foo', 'bar'] => {foo: true, bar: true}
  };
}

export function parseModel(val: string): ModelParseResult {
  // eslint-disable-next-line prefer-const
  let len, str, chr, index, expressionPos, expressionEndPos;

  function next(): number {
    return str.charCodeAt(++index);
  }

  function eof(): boolean {
    return index >= len;
  }

  function isStringStart(chr: number): boolean {
    return chr === 0x22 || chr === 0x27;
  }

  function parseBracket(chr: number): void {
    let inBracket = 1;
    expressionPos = index;
    while (!eof()) {
      chr = next();
      if (isStringStart(chr)) {
        parseString(chr);
        continue;
      }
      if (chr === 0x5b) inBracket++;
      if (chr === 0x5d) inBracket--;
      if (inBracket === 0) {
        expressionEndPos = index;
        break;
      }
    }
  }

  function parseString(chr: number): void {
    const stringQuote = chr;
    while (!eof()) {
      chr = next();
      if (chr === stringQuote) {
        break;
      }
    }
  }

  val = val.trim();
  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index = val.lastIndexOf('.');
    if (index > -1) {
      return {
        exp: val.slice(0, index),
        key: '"' + val.slice(index + 1) + '"',
      };
    } else {
      return {
        exp: val,
        key: null,
      };
    }
  }

  str = val;
  index = expressionPos = expressionEndPos = 0;

  while (index < len) {
    const chr = str.charCodeAt(++index);
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5b) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos),
  };
}
