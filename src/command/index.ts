
import { Component } from '../index'
import Watcher from '../observer/watcher'

export interface ICommand{
    implement();
    update();
}

export abstract class CommandBase implements ICommand {
    protected vm:Component
    protected sp:egret.DisplayObject
    protected name:string
    protected expOrFn:string

    constructor(
        vm:Component, 
        sp:egret.DisplayObject, 
        name:string, 
        expOrFn:string
    ){
        this.vm = vm
        this.sp = sp
        this.name = name
        this.expOrFn = expOrFn

        this.implement()
        this._addWatcher()
    }

    protected _addWatcher() {
        // 在这里开始创建观察者实例 将监听的值变化时 触发update回调函数
        // new Watcher(this.vm, this.name, this.update.bind(this))
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
        new(vm:Component, sp:egret.DisplayObject, name:string, expOrFn:string):ICommand
    }, vm:Component, sp:egret.DisplayObject, name:string, expOrFn:string):ICommand {
        return new Command(vm, sp, name, expOrFn)
    }
}