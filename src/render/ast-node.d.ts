import { ForParseResult } from "../helpers";
export interface ASTAttr {
    name: string;
    value: any;
    dynamic?: boolean;
}
export interface ASTNode {
    key: string | number;
    tag: string;
    text: string;
    attrsList: Array<ASTAttr>;
    attrsMap: Object;
    processMap: {
        [propsName: string]: any;
        for?: ForParseResult;
        ifConditions?: Array<{
            exp: string;
            target: ASTNode;
        }>;
    };
    children: Array<ASTNode>;
    parent: ASTNode;
}
export default function createASTNode(tag: string, attrs: Array<ASTAttr>, parent: ASTNode): ASTNode;
