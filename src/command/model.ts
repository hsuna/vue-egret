import { CommandBase } from './index'

export class CommandModel extends CommandBase{
    static REG:RegExp = /^v-model/

    implement() {
        this.sp['value'] = this.generate(this.expOrFn)
        this.sp.addEventListener('change', this.generate(this.expOrFn), this.vm)
    }

    update() {
        this.sp['value'] = this.generate(this.expOrFn)
    }
}