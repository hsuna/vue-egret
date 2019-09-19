import ParseHtml, { ParseHtmlAttr, ParseHtmlOptions } from './html-parser'
import VueEgret, { Component } from '../index'
import createASTNode, { ASTNode } from './ast-node'
import { parseFor, getAndRemoveAttr } from '../helpers/index'
import { genVNode, createVNode, VNode } from './v-node';
import { installRender } from '../render';

// 指令解析器
export default class Compile implements ParseHtmlOptions {
    vm: Component
    vnode: VNode;
    root: ASTNode
    target: ASTNode
    parent: ASTNode;
    astCode: string;
    
    constructor(vm:Component){
        this.vm = vm
        this._init()
    }

    private _init() {
        installRender(this.vm);
        new ParseHtml(`${this.vm.options.template}`, this)
        this.astCode = genVNode(this.root);
    }
    
    public render(){
        let vnode:VNode = this._createVNode();
        this.vnode = this._patch(this.vnode, vnode);
    }

    private _patch(oldVNode:VNode, newVNode:VNode): VNode{
        if(!oldVNode){//如果不存在旧节点的情况下，说明还未初始化，则初始化页面
            // 创建新节点
            let sp:egret.DisplayObject = this._createDisObj(newVNode);
            (this.vm.sp as egret.DisplayObjectContainer).addChild(sp);
        }else if(this._sameVNode(oldVNode, newVNode)){//相似节点采用更新的方式
            this._patchVNode(oldVNode, newVNode);
            newVNode.sp = oldVNode.sp;
        }else{//非相似节点直接替换
            const parent:egret.DisplayObjectContainer = oldVNode.sp.parent
            if(parent){
                // 创建新节点
                let sp:egret.DisplayObject = this._createDisObj(newVNode);
                parent.addChildAt(sp, parent.getChildIndex(oldVNode.sp))
                this._destroyDisObj(oldVNode)
            }
        }
        return newVNode;
    }

    private _patchVNode(oldVNode:VNode, newVNode:VNode){
        if(oldVNode === newVNode) return;
        this._updateDisObj(oldVNode, newVNode);
        let oldCh:Array<VNode> = oldVNode.children, newCh:Array<VNode> = newVNode.children;       
        if(oldCh === newCh) return;
        let len:number = Math.max(oldCh.length, newCh.length);
        for(let i=0; i<len; i++){
            if(newCh[i] && oldCh[i]){//子节点均存在时，进行比较
                oldCh[i] = this._patch(oldCh[i], newCh[i])
            }else if(newCh[i]){//需要添加新子节点
                let sp:egret.DisplayObject = this._createDisObj(newCh[i]);
                (newVNode.sp as egret.DisplayObjectContainer).addChild(sp);
            }else if(oldCh[i]){//删除多余的旧子节点
                this._destroyDisObj(oldCh[i]);
            }
        }
    }

    private _sameVNode(oldVNode:VNode, newVNode:VNode):boolean {
        return (
            //newVNode.key === oldVNode.key && //key值
            oldVNode.tag === newVNode.tag // 类名
        )
    }

    private _createVNode():VNode {
        try{
            console.log(this.astCode);
            return Function.prototype.constructor(`with(this){ return ${this.astCode};}`).call(this.vm)
        }catch(e){
            console.error(e, this.astCode)
        }
    }

    private _createDisObj(vnode:VNode):egret.DisplayObject {
        if(VueEgret._components[vnode.tag]){
            vnode.sp = new (VueEgret._components[vnode.tag])
        }else if(egret[vnode.tag]){
            vnode.sp = new (egret[vnode.tag])
        }
        Object.keys(vnode.attrs).forEach(name => {
            vnode.sp[name] = vnode.attrs[name]
        })
        Object.keys(vnode.on).forEach(type => {
            vnode.sp.addEventListener(type, vnode.on[type], this.vm)
        })
        vnode.children.forEach((child:VNode) => (vnode.sp as egret.DisplayObjectContainer).addChild(this._createDisObj(child)))
        return vnode.sp;
    }

    private _updateDisObj(oldVNode:VNode, newVNode:VNode) {
        Object.keys(newVNode.attrs).forEach(name => {
            oldVNode.sp[name] = newVNode.attrs[name]
        })
        Object.keys(newVNode.on).forEach(type => {
            if(oldVNode.on[type] !== newVNode.on[type]){//事件不一样的，先销毁再重新注册
                oldVNode.sp.removeEventListener(type, oldVNode.on[type], this.vm)
                oldVNode.sp.addEventListener(type, newVNode.on[type], this.vm)
            }
        })
    }

    private _destroyDisObj(vnode:VNode):VNode {
        if(vnode.sp){
            vnode.sp.parent && vnode.sp.parent.removeChild(vnode.sp)
            Object.keys(vnode.on).forEach(type => {
                vnode.sp.removeEventListener(type, vnode.on[type], this)
            })
        }
        vnode.children.forEach((vnode:VNode) => this._destroyDisObj(vnode))
        return vnode;
    }

    startElement(tagName:string, attrs:Array<ParseHtmlAttr>, unary:boolean){
        this.parent = this.target;
        this.target = createASTNode(tagName, attrs, this.parent);

        if(!this.root){
            this.root = this.target
        }else if(!this.parent){
            throw new Error('tow root')
        }

        if (unary) {
            this.endElement(tagName);
        }
    }

    endElement(tagName:string){
        let exp
        if(exp = getAndRemoveAttr(this.target, 'ref')) this.target.processMap.ref = exp
        if(exp = getAndRemoveAttr(this.target, 'v-for')) this.target.processMap.for = parseFor(exp)
        if(exp = getAndRemoveAttr(this.target, 'v-if')) this.target.processMap.if = this.addIfConditions(exp)
        else if(exp = getAndRemoveAttr(this.target, 'v-else-if')) this.target.processMap.elseif = this.addIfConditions(exp, true)
        else if('undefined' !== typeof (exp = getAndRemoveAttr(this.target, 'v-else'))) this.target.processMap.else = this.addIfConditions(true, true)

        if(
            this.parent 
            && this.target !== this.root
            && !this.target.processMap.elseif
            && !this.target.processMap.else
        ){
            this.parent.children.push(this.target)
        }
        this.target = this.parent;
        if(this.parent){
            this.parent = this.parent.parent;
        }
    }

    comment(text:string){
    }

    characters(text:string){
        this.target.text = text.replace(/^\s+|\s+$/g, '')
        //this._command.push(new CommandText(this.vm, this.target, text))
    }

    addIfConditions(exp:any, prev:boolean=false):any {
        let processMap;
        if(prev){
            const parent:ASTNode = this.target.parent;
            if(parent){
                const curTarget:ASTNode = parent.children[parent.children.length-1]
                if(curTarget){
                    processMap = curTarget.processMap;
                    processMap.ifConditions.push({exp, target: this.target});
                }
            }
        }else{
            processMap = this.target.processMap;
            if(!processMap.ifConditions) processMap.ifConditions = [];
            processMap.ifConditions.push({exp, target: this.target});
        }
        return exp
    }
}