import { CommandBase } from './index'

export class CommandOn extends CommandBase{
    static REG:RegExp = /^(v-on:|@)/

    implement() {
        this.sp.addEventListener(this.name, this.generate(this.expOrFn), this.vm)
    }

    update() {
    }
}