import { Component } from '../index'
import { CommandBase } from './index'

export class CommandBind extends CommandBase{
    static REG:RegExp = /^(v-bind:|:)/

    constructor(
        vm:Component, 
        sp:egret.DisplayObject, 
        expOrFn:string,
        name?:string
    ){
        super(vm, sp, expOrFn, name.replace(CommandBind.REG, ''))
    }

    implement() {
        this.sp[this.name] = this.generate(this.expOrFn)
    }
}