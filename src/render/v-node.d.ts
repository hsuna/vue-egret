import { ASTNode } from './ast-node';
export interface Variate {
    [varName: string]: string;
}
export interface VNode {
    sp?: egret.DisplayObject;
    tag: string;
    children: Array<VNode>;
    attrs: {
        [propsName: string]: any;
    };
    on: {
        [eventType: string]: Function;
    };
}
export declare function genAttr(ast: ASTNode): string;
export declare function genText(ast: ASTNode): string;
export declare function genHandler(exp: string): string;
export declare function genVNode(ast: ASTNode, isCheck?: boolean): string;
export declare function createVNode(tag: string, data: any, children: Array<VNode>): VNode;
