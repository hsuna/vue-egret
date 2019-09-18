import ParseHtml, { ParseHtmlAttr, ParseHtmlOptions } from './html-parser'
import VueEgret, { Component } from '../index'
import CommandFactory, {
    ICommand,
    CommandText,
    CommandBind,
    CommandModel,
    CommandOn,
    CommandIf,
    CommandElseIf,
    CommandElse,
    CommandFor,
} from '../command/index'
import { parseFor, getAndRemoveAttr } from '../helpers/index'

export interface ASTAttr {
    name: string
    value: any
}
export interface ASTNode {
    tag: string,
    tagClass: any,
    text: string,
    attrsList: Array<ASTAttr>,
    attrsMap: Object,
    processMap: {
        [porpName:string]: any
    },
    children: Array<ASTNode>,
    parent: ASTNode,
}

export function createVNode (
    tag: string,
    attrs: Array<ASTAttr>,
    parent: ASTNode
): ASTNode {
    return {
      tag,
      tagClass: VueEgret._components[tag] || egret[tag] || null,
      text: '',
      attrsList: attrs,
      attrsMap: attrs.reduce((m, i) => Object.assign(m, {[i.name]:i.value}), {}),
      processMap: {},
      parent,
      children: []
    }
}

// 指令解析器
export default class Compile implements ParseHtmlOptions {
    vm: Component
    root: ASTNode
    target: ASTNode
    parent: ASTNode
    _command: Array<ICommand>
    
    constructor(vm:Component){
        this.vm = vm
        this._command = []

        this._init()
    }

    private _init() {
        new ParseHtml(`${this.vm.options.template}`, this)
    }
    
    public render(){
        console.log(this._createdVNode(this.root));
        this._patch()
    }

    private _createdVNode(node: ASTNode){
        if(node.processMap.for){

        }
        return 
    }

    private _patch(){

    }

    startElement(tagName:string, attrs:Array<ParseHtmlAttr>, unary:boolean){
        this.parent = this.target;
        this.target = createVNode(tagName, attrs, this.parent);

        let exp
        if(exp = getAndRemoveAttr(this.target, 'ref')) this.target.processMap.ref = exp
        if(exp = getAndRemoveAttr(this.target, 'v-for')) this.target.processMap.for = parseFor(exp)
        if(exp = getAndRemoveAttr(this.target, 'v-if')) this.target.processMap.if = exp
        else if(exp = getAndRemoveAttr(this.target, 'v-else-if')) this.target.processMap.elseif = exp
        if('undefined' !== typeof (exp = getAndRemoveAttr(this.target, 'v-else'))) this.target.processMap.else = true

        if(!this.root){
            this.root = this.target
        }

        if (unary) {
            this.endElement(tagName);
        }
    }
    endElement(tagName:string){
        if(this.parent && this.target !== this.root){
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
}