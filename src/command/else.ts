import { CommandBase } from './index'

export class CommandElse extends CommandBase{
    static REG:RegExp = /^(v-else)/

    implement() {
        this.sp.parent['V_ELSE'] = !this.sp.parent['V_IF'] && !this.sp.parent['V_ELSE_IF']
        this.sp.visible = this.sp.parent['V_ELSE']
    }
}