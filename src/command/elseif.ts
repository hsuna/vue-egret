import { CommandBase } from './index'

export class CommandElseIf extends CommandBase{
    static REG:RegExp = /^(v-else-if)/

    implement() {
        this.sp.parent['V_ELSE_IF'] = !this.sp.parent['V_IF'] && !!this.generate(this.expOrFn)
        this.sp.visible = this.sp.parent['V_ELSE_IF']
    }
}