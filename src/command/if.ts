import { CommandBase } from './index'

export class CommandIf extends CommandBase{
    static KEY:string = '$$V_IF'
    static REG:RegExp = /^(v-if)/

    implement() {
        this.sp.parent[CommandIf.KEY] = !!this.generate(this.expOrFn)
        this.sp.visible = this.sp.parent[CommandIf.KEY]
    }
}