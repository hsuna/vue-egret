import { toNumber, toString } from "../util";
import ParserFactory from "../parser";
import { createVNode, VNode, genVNode } from "./v-node";
import { renderList } from "./rendreList";
import VueEgret, { Component } from "../index";

export function installRender (target: any) {
  target._c = createVNode
  target._n = toNumber
  target._s = toString
  target._l = renderList
}
  
export default class Render {
  vm: Component;
  vnode:VNode;
  astCode:string;

  constructor(vm:Component){
    this.vm = vm;
    this._init();
  }
  
  private _init(){
    installRender(this.vm);
    this.astCode = genVNode(ParserFactory.created(this.vm.options.template).root);
  }

  public update(){
    let vnode:VNode = this._createVNode(this.astCode);
    this.vnode = this._patch(this.vnode, vnode);
  }

  private _patch(oldVNode:VNode, newVNode:VNode): VNode{
    if(!oldVNode){//如果不存在旧节点的情况下，说明还未初始化，则初始化页面
        // 创建新节点
        let sp:egret.DisplayObject = this._createDisObj(newVNode);
        (this.vm.sp as egret.DisplayObjectContainer).addChild(sp);
    }else if(this._sameVNode(oldVNode, newVNode)){//相似节点采用更新的方式
        this._patchVNode(oldVNode, newVNode);
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
    newVNode.sp = oldVNode.sp;
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

  private _createVNode(code):VNode {
    try{
        return Function.prototype.constructor(`with(this){ return ${code};}`).call(this.vm)
    }catch(e){
        console.error(e, code)
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
      if(oldVNode.attrs[name] !== newVNode.attrs[name]){
        oldVNode.sp[name] = newVNode.attrs[name]
      }
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
      if(vnode.sp instanceof VueEgret) (vnode.sp as VueEgret).vm.$callHook('beforeDestroyed');
      vnode.sp.parent && vnode.sp.parent.removeChild(vnode.sp)
      Object.keys(vnode.on).forEach(type => {
          vnode.sp.removeEventListener(type, vnode.on[type], this)
      })
      if(vnode.sp instanceof VueEgret) (vnode.sp as VueEgret).vm.$callHook('destroyed');
    }
    vnode.children.forEach((vnode:VNode) => this._destroyDisObj(vnode))
    return vnode;
  }
}