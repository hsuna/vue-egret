import { ForParseResult } from "../helpers";

/** 语法树 */

export interface ASTAttr {
    name: string;
    value: any;
    dynamic?: boolean;
}
export interface ASTNode {
    tag: string,
    text: string,
    attrsList: Array<ASTAttr>,
    attrsMap: Object,
    processMap: {
        [propsName:string]: any,
        for?: ForParseResult,
        ifConditions?: Array<{
            exp: string,
            target: ASTNode
        }>
    },
    children: Array<ASTNode>,
    parent: ASTNode,
}

export default function createASTNode (
    tag: string,
    attrs: Array<ASTAttr>,
    parent: ASTNode
): ASTNode {
    return {
      tag,
      text: '',
      attrsList: attrs,
      attrsMap: attrs.reduce((m, i) => Object.assign(m, {[i.name]:i.value}), {}),
      processMap: {},
      parent,
      children: []
    }
}