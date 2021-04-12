import { ForParseResult } from '../helpers';

/** 语法树 */
export interface ASTAttr {
  name: string;
  value: any;
  dynamic?: boolean;
}
export interface ASTNode {
  key?: string;
  ref?: string;
  component?: string;
  tag: string;
  text: string;
  attrsList: Array<ASTAttr>;
  attrsMap: Object;
  for?: ForParseResult;
  if?: string;
  elseif?: string;
  else?: boolean;
  ifConditions?: Array<{
    exp: string | boolean;
    target: ASTNode;
  }>;
  children: Array<ASTNode>;
  parent: ASTNode;
}

/**
 * 创建语法树节点
 * @param { string } tag 标签名
 * @param { Array<ASTAttr> } attrs 属性列表
 * @param { ASTNode } parent 父语法树节点
 * @return { ASTNode } 新语法树节点
 */
export default function createASTNode(
  tag: string,
  attrs: Array<ASTAttr>,
  parent: ASTNode,
): ASTNode {
  return {
    tag,
    text: '',
    attrsList: attrs,
    attrsMap: attrs.reduce((m, i) => Object.assign(m, { [i.name]: i.value }), {}), // 将属性列表映射为属性键对
    parent,
    children: [],
  };
}
