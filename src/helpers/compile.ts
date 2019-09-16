import ParseHtml, { ParseHtmlAttr, ParseHtmlOptions } from './parser/html-parser'
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

export interface Node {
    text: string,
    attrs: any,
    children: Array<Node>
}

// 指令解析器
export default class Compile implements ParseHtmlOptions {
    vm: Component
    target: egret.DisplayObject
    _command: Array<ICommand>
    
    constructor(vm:Component){
        this.vm = vm
        this.target = this.vm.sp
        this._command = []

        this._init()
    }

    private _init() {
        new ParseHtml(`${this.vm.options.template}`, this)
    }

    public render(){
        this._command.forEach((c:ICommand) => c.update())
    }

    startElement(tagName:string, attrs:Array<ParseHtmlAttr>){
        let sp:egret.DisplayObject;
        if(VueEgret._components[tagName]){
            sp = new (VueEgret._components[tagName])
        }else if(egret[tagName]){
            sp = new (egret[tagName])
        }
        if(sp){
            (this.target as egret.DisplayObjectContainer).addChild(sp);
            this.target = sp;
        }else{
            return;
        }
        attrs.forEach((attr:ParseHtmlAttr) => {
            if(CommandOn.REG.test(attr.name)){
                this._command.push(CommandFactory.create(CommandOn, this.vm, this.target, attr.name.replace(CommandOn.REG, ''), attr.value))
            }else if(CommandBind.REG.test(attr.name)){
                this._command.push(CommandFactory.create(CommandBind, this.vm, this.target, attr.name.replace(CommandBind.REG, ''), attr.value))
            }else if(CommandModel.REG.test(attr.name)){
                this._command.push(CommandFactory.create(CommandModel, this.vm, this.target, attr.name.replace(CommandModel.REG, ''), attr.value))
            }else if(attr.value){
                const orgType = typeof this.target[attr.name]
                if('number' === orgType) this.target[attr.name] = Number(attr.value);
                else if('boolean' === orgType) this.target[attr.name] = Boolean(attr.value);
                else if('object' === orgType) this.target[attr.name] = JSON.stringify(attr.value);
                else this.target[attr.name] = attr.value
            }
        })
    }
    endElement(tagName:string){
        this.target = this.target.$parent;
    }
    comment(text:string){
    }
    characters(text:string){
        text = text.replace(/^\s+|\s+$/g, '')
        this._command.push(CommandFactory.create(CommandText, this.vm, this.target, 'text', text))
    }
}