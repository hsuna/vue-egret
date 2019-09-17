
import { Component } from '../index'
import Watcher from '../observer/watcher'

export interface ICommand{
    implement();
    update();
}

export abstract class CommandBase implements ICommand {
    protected vm:Component
    protected sp:egret.DisplayObject
    protected expOrFn:string
    protected name:string

    constructor(
        vm:Component, 
        sp:egret.DisplayObject, 
        expOrFn:string,
        name?:string
    ){
        this.vm = vm
        this.sp = sp
        this.expOrFn = expOrFn
        this.name = name
    }

    implement(){
    }

    update() {
        this.implement();
    }

    generate(code:string){
        try{
            return Function.prototype.constructor(`with(this){ return ${code};}`).call(this.vm)
        }catch(e){
            console.error(e, code)
        }
    }
}
export { CommandText } from './text'
export { CommandBind } from './bind'
export { CommandModel } from './model'
export { CommandOn } from './on'
export { CommandIf } from './if'
export { CommandElseIf } from './elseif'
export { CommandElse } from './else'
export { CommandFor } from './for'

export default class CommandFactory {
    constructor(){}

    static create(Command:{
        new(vm:Component, sp:egret.DisplayObject, expOrFn:string, name?:string):ICommand
    }, vm:Component, sp:egret.DisplayObject, expOrFn:string, name?:string):ICommand {
        return new Command(vm, sp, expOrFn, name)
    }
}