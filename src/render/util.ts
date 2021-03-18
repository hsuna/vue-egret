import { cached } from 'src/util';
import { ASTAttr, ASTNode } from './ast-node';
import { VNodeDirective } from './v-node';

export const DIR_REG = /^v-|^@|^:|^#/; // v-foo=
export const BIND_REG = /^(v-bind:|:)/; // v-bind:foo | :foo
export const ON_REG = /^(v-on:|@)/; // v-on:type | @type
export const DYNAMIC_ARG_RE = /^\[.*\]$/; // v-on:[arg]

export type ModelParseResult = {
  exp: string;
  key: string;
};

export type EventParseResult = {
  name: string;
  once: boolean;
  capture: boolean;
};

export interface AstData {
  key: any;
  tag: string;
  ref: string;
  refInFor: boolean;
  attrs: Array<VNodeDirective>;
  on: Array<VNodeDirective>;
  nativeOn: Array<VNodeDirective>;
  directives: Array<VNodeDirective>;
  wrapDir?: Array<Function>;
}

export function parseAttrList(ast: ASTNode): AstData {
  const astData: AstData = {
    tag: ast.tag,
    key: ast.key,
    ref: ast.ref,
    refInFor: false,
    attrs: [],
    on: [],
    nativeOn: [],
    directives: [],
    wrapDir: [],
  };
  ast.attrsList.forEach((attr: ASTAttr) => {
    if (DIR_REG.test(attr.name)) {
      const dir: VNodeDirective = parseDirective(attr.name, attr.value);
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
  if (ast.ref) {
    astData.refInFor = checkInFor(ast);
  }
  return astData;
}

export function parseDirective(directive: string, expression: string): VNodeDirective {
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

export const parseEvent: (name: string) => EventParseResult = cached<EventParseResult>(
  (name: string) => {
    const once = name.charAt(0) === '~'; // Prefixed last, checked first
    name = once ? name.slice(1) : name;
    const capture = name.charAt(0) === '!';
    name = capture ? name.slice(1) : name;
    return {
      name,
      once,
      capture,
    };
  },
);

export function parseModel(val: string): ModelParseResult {
  // eslint-disable-next-line prefer-const
  let len: number, str: string, chr: string, index: number, expressionPos, expressionEndPos;

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

function checkInFor(ast: ASTNode): boolean {
  let parent: ASTNode = ast;
  while (parent) {
    if (parent.for !== undefined) {
      return true;
    }
    parent = parent.parent;
  }
  return false;
}
