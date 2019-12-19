import { ForParseResult } from "../helpers";

/** 语法树 */
let uuid = 1234;

export interface ASTAttr {
    name: string;
    value: any;
    dynamic?: boolean;
}
export interface ASTNode {
    key: string | number,
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

/**
 * 创建语法树节点
 * @param { string } tag 标签名
 * @param { Array<ASTAttr> } attrs 属性列表
 * @param { ASTNode } parent 父语法树节点
 * @return { ASTNode } 新语法树节点
 */
export default function createASTNode (
    tag: string,
    attrs: Array<ASTAttr>,
    parent: ASTNode
): ASTNode {
    return {
      key: `${tag}_${++uuid}`,
      tag,
      text: '',
      attrsList: attrs,
      attrsMap: attrs.reduce((m, i) => Object.assign(m, {[i.name]:i.value}), {}), // 将属性列表映射为属性键对
      processMap: {},
      parent,
      children: []
    }
}