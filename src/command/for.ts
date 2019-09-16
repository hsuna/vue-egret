import { CommandBase } from './index'

export class CommandFor extends CommandBase{
    static REG:RegExp = /^(v-for:|:)/

    implement() {
        this.sp[this.name] = this.generate(this.expOrFn)
    }
}