import { toNumber, toString } from "../util";
import ParserFactory from "../parser";
import { createVNode, VNode, genVNode } from "./v-node";
import { renderList } from "./rendreList";
import VueEgret, { Component, ComponentClass, ComponentMap } from "../index";
import { pushTarget, popTarget } from "../observer/dep";

export function installRender (target: any) {
  target._c = createVNode
  target._n = toNumber
  target._s = toString
  target._l = renderList
}

const TIME_COOL = 50
export default class Render {
  private _timeoutCool: any;
  private _ast:string;
  private _vm: Component;
  private _vnode:VNode;
  private _newVnode:VNode;
  
  constructor(vm:Component){
    this._vm = vm;
    this._init();
  }
  
  private _init(){
    installRender(this._vm);
    this._ast = genVNode(ParserFactory.created(this._vm.options.template).root);
    this._tick();
  }

  private _tick(){
    if(this._vm){
      this._newVnode = this._createVNode(this._ast);
      this._vnode = this._patch(this._vnode, this._newVnode);
      this._vm._$tick();
    }
  }

  public update(){
    this._tick();
    
    // 设置冷却时间
    /* if(this._timeoutCool) return;
    this._timeoutCool = setTimeout(_ => {
      this._tick();
      clearTimeout(this._timeoutCool);
      this._timeoutCool = null;
    }, TIME_COOL) */
  }

  public destroy(){
    this._vnode && this._destroyDisObj(this._vnode)
    this._vm = null;
  }
  
  private _patch(oldVNode:VNode, newVNode:VNode): VNode{
    if(!oldVNode){//如果不存在旧节点的情况下，说明还未初始化，则初始化页面
        // 创建新节点
        let sp:egret.DisplayObject = this._createDisObj(newVNode);
        (this._vm.sp as egret.DisplayObjectContainer).addChild(sp);
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
    if(oldStartIdx > oldEndIdx){
      let sp:egret.DisplayObject
      while(newStartVNode){
        sp = this._createDisObj(newStartVNode);
        parent.addChild(sp);
        newStartVNode = newCh[++newStartIdx]
      }
    }else if(newStartIdx > newEndIdx){
      while(oldStartVNode){
        this._destroyDisObj(oldStartVNode)
        oldStartVNode = oldCh[++oldStartIdx]
      }
    }
  }

  private _sameVNode(oldVNode:VNode, newVNode:VNode):boolean {
    return (
        newVNode.key === oldVNode.key && //key值
        oldVNode.tag === newVNode.tag // 类名
    )
  }

  private _createVNode(code):VNode {
    return Function.prototype.constructor(`with(this){ return ${code};}`).call(this._vm)
    /* try{
    }catch(e){
        throw new Error(e)
    } */
  }
  
  private _createDisObj(vnode:VNode):egret.DisplayObject {
    let VClass: ComponentClass = this._vm._components[vnode.tag] || VueEgret._components[vnode.tag]
    pushTarget();//阻断所有更新监听
    // Component
    if(VClass){
      const propsData: ComponentMap<any> = {};
      const _propsKeys: Array<string> = [];
      const props:ComponentMap<any> = VClass.options.props;
      for(const key in props){
        _propsKeys.push(key);
        if(key in vnode.attrs) propsData[key] = vnode.attrs[key]
        if(key in this._vm._props) propsData[key] = this._vm._props[key]
      }
      vnode.sp = new VClass({
        parent: this._vm,
        _propsKeys,
        propsData
      })
    }else{
      VClass = egret[vnode.tag]
      if(VClass) vnode.sp = new (<any>VClass)
    }
    if(!VClass) throw new Error(`Then [${vnode.tag}] Node is undefined!!!`)

    for(const name in vnode.attrs){
      vnode.sp[name] = vnode.attrs[name]
    }
    for(const type in vnode.on){
      vnode.sp.addEventListener(type, vnode.on[type], this._vm)
    }
    // 实例节点
    if(vnode.ref){
      this._vm.__refs[vnode.ref] = vnode.sp
    }
    vnode.children.forEach((child:VNode) => (vnode.sp as egret.DisplayObjectContainer).addChild(this._createDisObj(child)))
    popTarget();
    return vnode.sp;
  }

  private _updateDisObj(oldVNode:VNode, newVNode:VNode) {
    if(oldVNode.sp instanceof VueEgret){
      const vm:Component = (oldVNode.sp as VueEgret).vm;
      for(const key in vm._props){
        if(key in newVNode.attrs) vm._props[key] = newVNode.attrs[key]
        if(key in this._vm._props) vm._props[key] = this._vm._props[key]
      }
    }
    for(const name in newVNode.attrs){
      if(oldVNode.attrs[name] !== newVNode.attrs[name]){
        oldVNode.sp[name] = newVNode.attrs[name]
        // oldVNode.attrs[name] = newVNode.attrs[name]
      }
    }
    for(const type in newVNode.on){
      if(oldVNode.on[type] !== newVNode.on[type]){//事件不一样的，先销毁再重新注册
          oldVNode.sp.removeEventListener(type, oldVNode.on[type], this._vm)
          oldVNode.sp.addEventListener(type, newVNode.on[type], this._vm)
          // oldVNode.on[type] = newVNode.on[type]
      }
    }
  }

  private _destroyDisObj(vnode:VNode):VNode {
    if(vnode.sp){
      if(vnode.sp instanceof VueEgret) (vnode.sp as VueEgret).vm.$callHook('beforeDestroyed');

      vnode.sp.parent && vnode.sp.parent.removeChild(vnode.sp);
      for(const type in vnode.on){
        vnode.sp.removeEventListener(type, vnode.on[type], this._vm)
      }
      
      if(vnode.sp instanceof VueEgret) (vnode.sp as VueEgret).destroy()
    }
    if(vnode.ref){
      delete this._vm.__refs[vnode.ref];
    }
    vnode.children.forEach((vnode:VNode) => this._destroyDisObj(vnode))
    return vnode;
  }

  /* public get vnode():VNode{
    return this._vnode;
  } */
}