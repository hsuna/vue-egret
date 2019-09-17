import { Component } from '../index'
import { CommandBase } from './index'

export class CommandOn extends CommandBase{
    static KEY:string = '$$V_LISTENER'
    static REG:RegExp = /^(v-on:|@)/

    constructor(
        vm:Component, 
        sp:egret.DisplayObject, 
        expOrFn:string,
        name?:string
    ){
        super(vm, sp, expOrFn, name.replace(CommandOn.REG, ''))
        this.sp[CommandOn.KEY] = []
    }

    implement() {
        const fn:Function = this.generate(this.expOrFn)
        this.sp.addEventListener(this.name, fn, this.vm)
        this.sp[CommandOn.KEY].push({
            name: this.name,
            fn,
        })
    }

    update() {
    }

    destroy(){
        this.sp[CommandOn.KEY].forEach(listener => {
            this.sp.removeEventListener(listener.name, listener.fn, this.vm)
        })
    }
}