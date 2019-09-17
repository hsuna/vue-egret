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

export interface ASTAttr {
    name: string
    value: any
}

export interface ASTNode {
    tag: string,
    text: string,
    attrsList: Array<ASTAttr>,
    attrsMap: Object,
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
      text: '',
      attrsList: attrs,
      attrsMap: attrs.reduce((m, i) => { m[i.name] = i.value; return m; }, {}),
      parent,
      children: []
    }
}

// 指令解析器
export default class Compile implements ParseHtmlOptions {
    vm: Component
    target: ASTNode
    parent: ASTNode
    stack: Array<ASTNode>
    _command: Array<ICommand>
    
    constructor(vm:Component){
        this.vm = vm
        this.stack = []
        this._command = []

        this._init()
    }

    private _init() {
        new ParseHtml(`${this.vm.options.template}`, this)
        this._command.forEach((c:ICommand) => c.implement())
    }

    public render(){
        this._command.forEach((c:ICommand) => c.update())
    }

    startElement(tagName:string, attrs:Array<ParseHtmlAttr>, unary:boolean){
        this.target = createVNode(tagName, attrs, this.parent);

        //processIf

        if (!unary) {
            this.parent = this.target
            this.stack.push(this.target)
        } else {
            this.closeElement();
        }
        /* let sp:egret.DisplayObject;
        if(VueEgret._components[tagName]){
            sp = new (VueEgret._components[tagName])
        }else if(egret[tagName]){
            sp = new (egret[tagName])
        }
        if(sp){
            (this.target as egret.DisplayObjectContainer).addChild(sp);
            this.target = sp;

            attrs.forEach((attr:ParseHtmlAttr) => {
                if(CommandOn.REG.test(attr.name)){
                    this._command.push(new CommandOn(this.vm, this.target, attr.value, attr.name))
                }else if(CommandBind.REG.test(attr.name)){
                    this._command.push(new CommandBind(this.vm, this.target, attr.value, attr.name))
                }else if(CommandModel.REG.test(attr.name)){
                    this._command.push(new CommandModel(this.vm, this.target, attr.value, attr.name))
                }else if(CommandIf.REG.test(attr.name)){
                    this._command.push(new CommandIf(this.vm, this.target, attr.value))
                }else if(CommandElseIf.REG.test(attr.name)){
                    this._command.push(new CommandElseIf(this.vm, this.target, attr.value))
                }else if(CommandElse.REG.test(attr.name)){
                    this._command.push(new CommandElse(this.vm, this.target, attr.value))
                }else if(attr.value){
                    const orgType = typeof this.target[attr.name]
                    if('number' === orgType) this.target[attr.name] = Number(attr.value);
                    else if('boolean' === orgType) this.target[attr.name] = Boolean(attr.value);
                    else if('object' === orgType) this.target[attr.name] = JSON.stringify(attr.value);
                    else this.target[attr.name] = attr.value
                }
            })
        } */
    }
    endElement(tagName:string){
        this.target = this.parent;
        this.closeElement();
    }
    comment(text:string){
    }
    characters(text:string){
        this.target.text = text.replace(/^\s+|\s+$/g, '')
        //this._command.push(new CommandText(this.vm, this.target, text))
    }
    closeElement(){

    }
}