import { ASTAttr, ASTNode } from '../render/ast-node';
export interface ForParseResult {
    for: string;
    alias: string;
    iterator1?: string;
    iterator2?: string;
}
export declare function parseFor(exp: string): ForParseResult;
export declare function getAndRemoveAttr(node: ASTNode, name: string): any;
export declare function getAndRemoveAttrByRegex(node: ASTNode, name: RegExp): ASTAttr;
