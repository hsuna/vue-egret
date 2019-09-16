import { CommandBase } from './index'

export class CommandIf extends CommandBase{
    static REG:RegExp = /^(v-if)/

    implement() {
        this.sp.parent['V_IF'] = !!this.generate(this.expOrFn)
        this.sp.visible = this.sp.parent['V_IF']
    }
}