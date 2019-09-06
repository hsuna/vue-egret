import { parseString } from 'xml2js'
import VueEgret, { VueEgretVM } from '../index'
import handles, { IHandles, IHandle } from './handles'
import Watcher from '../observer/watcher'

export interface Node {
    text: string,
    attrs: any,
    children: Array<Node>
}

// 指令解析器
export default class Compile {
    static ON_RE:RegExp = /^(v-on:|@)/
    static MODEL_RE:RegExp = /^v-model/
    static BIND_RE:RegExp = /^(v-bind:|:)/
    static TEXT_RE:RegExp = /\{\{(\w+)\}\}/g

    vm: VueEgretVM
    handles: IHandles
    dirs: Array<any>

    constructor(vm:VueEgretVM){
        this.vm = vm
        this.handles = handles
        this.dirs = []

        this._init()
    }

    private _init() {
        parseString(`<View>${this.vm.options.template}</View>`, {
            trim: true,
            charkey: 'text',
            attrkey: 'attrs',
            childkey: 'children',
            explicitRoot: false,
            explicitChildren: true,
            preserveChildrenOrder: true,
        }, (err, node:Node) => {
            this.parse(node, this.vm.sp)
            this.render()
        })
    }

    parse(node:Node, sp:egret.DisplayObjectContainer) {
        if(node.text){
            this.addDir(this.handles.text, sp, 'text', node.text)
        }

        const attrs = node.attrs || {}
        Object.keys(attrs).forEach((name:string) => {
            if (Compile.ON_RE.test(name)) {
                this.addDir(this.handles.on, sp, name.replace(Compile.ON_RE, ''), attrs[name])
            } else if (Compile.BIND_RE.test(name)) {
                this.addDir(this.handles.bind, sp, name.replace(Compile.BIND_RE, ''), attrs[name])
            } else if (Compile.MODEL_RE.test(name)) {
                this.addDir(this.handles.model, sp, name.replace(Compile.MODEL_RE, ''), attrs[name])
            }
        })

        const children = node.children || []
        children.forEach((node:Node) => {
            const n = node['#name']
            let CmptClass;
            if(VueEgret._components[n]){
                CmptClass = VueEgret._components[n]
            }else if(egret[n]){
                CmptClass = egret[n]
            }
            if(CmptClass){
                const cmpt = new CmptClass()
                sp.addChild(cmpt);
                this.parse(node, cmpt)
            }
        })
    }

    addDir(handle:IHandle, sp:egret.DisplayObjectContainer, name:string, expOrFn:any) {
        this.dirs.push({
            sp,
            handle,
            name,
            expOrFn,
        })
    }

    render() {
        this.dirs.forEach(e => {
            const handle = e.handle
            if (handle.implement) {
                handle.implement(this.vm, e.sp, e.name, e.expOrFn)
            } 
            const update = function(newVal, oldVal) {
                handle.update(this.vm, e.sp, e.name, e.expOrFn, newVal, oldVal)
            }
            // 在这里开始创建观察者实例 将监听的值变化时 触发update回调函数
            new Watcher(this.vm, e.expOrFn, update)
        })
    }
}





/* 
import { parseString } from 'xml2js'

interface Node {
    text: string,
    attrs: any,
    children: Array<Node>
}
 _addedStageHandler(evt){
      let S = this._options.components['Sprite']
        let a = new S()
        this.addChild(a);
        a.x = 11;
        a.y = 12;

        let T = this._options.components['TextField']
        let b = new T()
        a.addChild(b)
        b.x = 11
        b.y == 12
        b.text = '{{scenes}}' 

       parseString(`<View>${this._options.template}</View>`, {
            trim: true,
            charkey: 'text',
            attrkey: 'attrs',
            childkey: 'children',
            explicitRoot: false,
            explicitChildren: true,
            preserveChildrenOrder: true,
        }, (err, node) => {
            this._render(node, this)
        }) 
    }
    _render(node:Node, target) {
        target.text = node.text || ''
        if(node.attrs){
            Object.keys(node.attrs).forEach(key => {
                target[key] = Number(node.attrs[key])
            })
        }
        if(node.children){
            node.children.forEach((node:Node) => {
                const n = node['#name']
                let CmptClass;
                if(VueEgret._components[n]){
                    CmptClass = VueEgret._components[n]
                }else if(egret[n]){
                    CmptClass = egret[n]
                }
                if(CmptClass){
                    const cmpt = new CmptClass()
                    target.addChild(cmpt);
                    this._render(node, cmpt)
                }
            })
        }
    }

*/