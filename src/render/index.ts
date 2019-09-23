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
    this._updateDisObj(oldVNode, newVNode);
    this._updateChildren(oldVNode.children, newVNode.children, newVNode.sp as egret.DisplayObjectContainer)
  }

  private _updateChildren(oldCh:Array<VNode>, newCh:Array<VNode>, parent:egret.DisplayObjectContainer){
    if(oldCh === newCh) return;
    let oldStartIdx:number = 0
    let newStartIdx:number = 0
    let oldEndIdx:number = oldCh.length - 1
    let newEndIdx:number = newCh.length - 1
    let oldStartVNode:VNode = oldCh[0]
    let oldEndVNode:VNode = oldCh[oldEndIdx]
    let newStartVNode:VNode = newCh[0]
    let newEndVNode:VNode = newCh[newEndIdx]

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (!oldStartVNode) {
        oldStartVNode = oldCh[++oldStartIdx]
      } else if (!oldEndVNode) {
        oldEndVNode = oldCh[--oldEndIdx]
      } else if (this._sameVNode(oldStartVNode, newStartVNode)) {
        this._patchVNode(oldStartVNode, newStartVNode)
        oldStartVNode = oldCh[++oldStartIdx]
        newStartVNode = newCh[++newStartIdx]
      } else if (this._sameVNode(oldEndVNode, newEndVNode)) {
        this._patchVNode(oldEndVNode, newEndVNode)
        oldEndVNode = oldCh[--oldEndIdx]
        newEndVNode = newCh[--newEndIdx]
      } else {
        let sp:egret.DisplayObject
        for(let i=oldStartIdx; i<=oldEndIdx; i++){
          if(this._sameVNode(newStartVNode, oldCh[i])){
            this._patchVNode(oldCh[i], newStartVNode);
            //修改位置
            sp = newStartVNode.sp;
            parent.setChildIndex(sp, newStartIdx);
            
            let oldVNode:VNode = oldCh.splice(i, 1)[0];
            oldCh.splice(newStartIdx, 0, oldVNode);
            oldStartVNode = oldCh[++oldStartIdx]
            break;
          }
        }
        if(!sp){
          sp = this._createDisObj(newStartVNode);
          parent.addChildAt(sp, newStartIdx);
        }

        newStartVNode = newCh[++newStartIdx]
      }
    }
    for(let i=oldStartIdx; i<=oldEndIdx; i++){
      this._destroyDisObj(oldCh[i])
    }
  }

  private _sameVNode(oldVNode:VNode, newVNode:VNode):boolean {
    return (
        newVNode.key === oldVNode.key && //key值
        oldVNode.tag === newVNode.tag // 类名
    )
  }

  private _createVNode(code):VNode {
    try{
        return Function.prototype.constructor(`with(this){ return ${code};}`).call(this.vm)
    }catch(e){
        throw new Error(e)
    }
  }
  
  private _createDisObj(vnode:VNode):egret.DisplayObject {
    const VClass: Function = this.vm._components[vnode.tag] || VueEgret._components[vnode.tag] || egret[vnode.tag]
    if(!VClass) throw new Error(`Then [${vnode.tag}] Node is undefined!!!`)
    vnode.sp = new (<any>VClass)
    for(const name in vnode.attrs){
      vnode.sp[name] = vnode.attrs[name]
    }
    for(const type in vnode.on){
      vnode.sp.addEventListener(type, vnode.on[type], this.vm)
    }
    if(vnode.sp instanceof VueEgret){
      const vm:Component = (vnode.sp as VueEgret).vm;
      for(const key in vm._props){
        if(key in vnode.attrs) vm._props[key] = vnode.attrs[key]
        if(key in this.vm._props) this.vm._props[key]
      }
      vm.$callHook('mounted');
    }
    vnode.children.forEach((child:VNode) => (vnode.sp as egret.DisplayObjectContainer).addChild(this._createDisObj(child)))
    return vnode.sp;
  }

  private _updateDisObj(oldVNode:VNode, newVNode:VNode) {
    if(oldVNode.sp instanceof VueEgret){
      const vm:Component = (oldVNode.sp as VueEgret).vm;
      for(const key in vm._props){
        if(key in newVNode.attrs) vm._props[key] = newVNode.attrs[key]
        if(key in this.vm._props) vm._props[key] = this.vm._props[key]
      }
    }else{
      for(const name in newVNode.attrs){
        if(oldVNode.attrs[name] !== newVNode.attrs[name]){
          oldVNode.sp[name] = newVNode.attrs[name]
          // oldVNode.attrs[name] = newVNode.attrs[name]
        }
      }
      for(const type in newVNode.on){
        if(oldVNode.on[type] !== newVNode.on[type]){//事件不一样的，先销毁再重新注册
            oldVNode.sp.removeEventListener(type, oldVNode.on[type], this.vm)
            oldVNode.sp.addEventListener(type, newVNode.on[type], this.vm)
            // oldVNode.on[type] = newVNode.on[type]
        }
      }
    }
  }

  private _destroyDisObj(vnode:VNode):VNode {
    if(vnode.sp){
      if(vnode.sp instanceof VueEgret) (vnode.sp as VueEgret).vm.$callHook('beforeDestroyed');
      vnode.sp.parent && vnode.sp.parent.removeChild(vnode.sp);
      for(const type in vnode.on){
        vnode.sp.removeEventListener(type, vnode.on[type], this)
      }
      if(vnode.sp instanceof VueEgret) (vnode.sp as VueEgret).vm.$callHook('destroyed');
    }
    vnode.children.forEach((vnode:VNode) => this._destroyDisObj(vnode))
    return vnode;
  }
}