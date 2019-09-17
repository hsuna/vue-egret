import { CommandBase } from './index'
import { CommandIf } from './if';

export class CommandElseIf extends CommandBase{
    static KEY:string = '$$V_ELSE_IF'
    static REG:RegExp = /^(v-else-if)/

    implement() {
        this.sp.parent[CommandElseIf.KEY] = !this.sp.parent[CommandIf.KEY] && !!this.generate(this.expOrFn)
        this.sp.visible = this.sp.parent[CommandElseIf.KEY]
    }
}