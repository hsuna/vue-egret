import ParseHtml, { ParseHtmlAttr, ParseHtmlOptions } from './html-parser';
import { parseFor, getAndRemoveAttr, getBindingAttr } from '../helpers/index';
import createASTNode, { ASTNode } from '../render/ast-node';

/**
 * 模板解析工厂
 * @description 将模板解析成AST
 * @author Hsuna
 */
const REG_TRIM = /^\s+|\s+$/g; //去掉头尾空白
const REG_BREAK = /^\n+|\n+$/g; //去掉前后的空白行
const REG_INTERPOLATE = /{{([^}]+?)}}/; //{{text}}

export default class ParserFactory implements ParseHtmlOptions {
  private _root: ASTNode;
  private _target: ASTNode;
  private _parent: ASTNode;

  static created(template: string): ParserFactory {
    const parser: ParserFactory = new ParserFactory();
    new ParseHtml(template, parser);
    return parser;
  }

  startElement(tagName: string, attrs: Array<ParseHtmlAttr>, unary: boolean) {
    this._parent = this._target;
    this._target = createASTNode(tagName, attrs, this._parent);

    if (!this._root) {
      this._root = this._target;
    } else if (!this._parent) {
      throw new Error('tow root');
    }

    if (unary) {
      this.endElement(tagName);
    }
  }

  endElement(tagName: string) {
    let exp: string;
    if ((exp = getBindingAttr(this._target, 'is'))) this._target.component = exp;
    if ((exp = getBindingAttr(this._target, 'key'))) this._target.key = exp;
    if ((exp = getBindingAttr(this._target, 'ref'))) this._target.ref = exp;
    if ((exp = getAndRemoveAttr(this._target, 'v-for'))) this._target.for = parseFor(exp);
    if ((exp = getAndRemoveAttr(this._target, 'v-if'))) this._target.if = this.addIfConditions(exp);
    else if ((exp = getAndRemoveAttr(this._target, 'v-else-if')))
      this._target.elseif = this.addIfConditions(exp, true);
    else if ('undefined' !== typeof (exp = getAndRemoveAttr(this._target, 'v-else')))
      this._target.else = this.addIfConditions(true, true);

    if (this._parent && this._target !== this._root && !this._target.elseif && !this._target.else) {
      this._parent.children.push(this._target);
    }
    this._target = this._parent;
    if (this._parent) {
      this._parent = this._parent.parent;
    }
  }

  comment(text: string) {}

  /**
   *
   * @param { string } text
   */
  characters(text: string) {
    if (this._target) {
      let content: string = text
        .replace(REG_BREAK, '') // 去掉前后的空白行
        .split('\n')
        .map((s: string) => s.replace(REG_TRIM, ''))
        .join('\n'); // 去掉每行头尾空白
      let m: RegExpMatchArray = content.match(REG_INTERPOLATE);
      const templateArr: Array<string> = [];
      while (m) {
        templateArr.push(JSON.stringify(content.slice(0, m.index)));
        templateArr.push(m[1].replace(REG_TRIM, ''));
        content = content.slice(m.index + m[0].length);
        m = content.match(REG_INTERPOLATE);
      }
      if (content.length) {
        templateArr.push(JSON.stringify(content));
      }

      this._target.text = `''.concat(${templateArr.join(',')})`;
    }
  }

  /**
   *
   * @param exp
   * @param prev 前置
   */
  addIfConditions<T extends string | boolean>(exp: T, prev = false): T {
    let target: ASTNode;
    if (prev) {
      const parent: ASTNode = this._target.parent;
      if (parent) {
        const curTarget: ASTNode = parent.children[parent.children.length - 1];
        if (curTarget) {
          target = curTarget;
        }
      }
    } else {
      target = this._target;
    }
    if (target) {
      if (!target.ifConditions) target.ifConditions = [];
      target.ifConditions.push({ exp, target: this._target });
    }
    return exp;
  }

  /**
   * 获取根语法树节点
   * @get { ASTNode } root
   */
  public get root(): ASTNode {
    return this._root;
  }
}
