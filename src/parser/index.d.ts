import { ParseHtmlAttr, ParseHtmlOptions } from './html-parser';
import { ASTNode } from '../render/ast-node';
export default class ParserFactory implements ParseHtmlOptions {
    root: ASTNode;
    target: ASTNode;
    parent: ASTNode;
    static created(template: string): ParserFactory;
    startElement(tagName: string, attrs: Array<ParseHtmlAttr>, unary: boolean): void;
    endElement(tagName: string): void;
    comment(text: string): void;
    characters(text: string): void;
    addIfConditions(exp: any, prev?: boolean): any;
}
