import ParseHtml, { ParseHtmlAttr, ParseHtmlOptions } from './html-parser'
import { parseFor, getAndRemoveAttr } from '../helpers/index'
import createASTNode, { ASTNode } from '../render/ast-node'

// 指令解析器
export default class ParserFactory implements ParseHtmlOptions {
    root: ASTNode;
    target: ASTNode;
    parent: ASTNode;
    
    static created (template:string):ParserFactory {
        let parser:ParserFactory = new ParserFactory()
        new ParseHtml(template, parser)
        return parser;
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