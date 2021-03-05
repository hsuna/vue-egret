import ParseHtml, { ParseHtmlAttr, ParseHtmlOptions } from './html-parser';
import { parseFor, getAndRemoveAttr } from '../helpers/index';
import createASTNode, { ASTNode } from '../render/ast-node';

/**
 * 模板解析工厂
 * @description 将模板解析成AST
 * @author Hsuna
 */
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
    let exp: any;
    if ((exp = getAndRemoveAttr(this._target, 'v-for')))
      this._target.processMap.for = parseFor(exp);
    if ((exp = getAndRemoveAttr(this._target, 'v-if')))
      this._target.processMap.if = this.addIfConditions(exp);
    else if ((exp = getAndRemoveAttr(this._target, 'v-else-if')))
      this._target.processMap.elseif = this.addIfConditions(exp, true);
    else if ('undefined' !== typeof (exp = getAndRemoveAttr(this._target, 'v-else')))
      this._target.processMap.else = this.addIfConditions(true, true);

    if (
      this._parent &&
      this._target !== this._root &&
      !this._target.processMap.elseif &&
      !this._target.processMap.else
    ) {
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
      //去掉头尾空白，以及换行符
      this._target.text = text.replace(/^\s+|\s+$|\r|\n/g, '');
    }
  }

  /**
   *
   * @param exp
   * @param prev 前置
   */
  addIfConditions(exp: any, prev = false): any {
    let processMap;
    if (prev) {
      const parent: ASTNode = this._target.parent;
      if (parent) {
        const curTarget: ASTNode = parent.children[parent.children.length - 1];
        if (curTarget) {
          processMap = curTarget.processMap;
          processMap.ifConditions.push({ exp, target: this._target });
        }
      }
    } else {
      processMap = this._target.processMap;
      if (!processMap.ifConditions) processMap.ifConditions = [];
      processMap.ifConditions.push({ exp, target: this._target });
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
