import { CommandBase } from './index'
import { CommandIf } from './if';
import { CommandElseIf } from './elseif';

export class CommandElse extends CommandBase{
    static KEY:string = '$$V_ELSE'
    static REG:RegExp = /^(v-else)/

    implement() {
        this.sp.parent[CommandElse.KEY] = !this.sp.parent[CommandIf.KEY] && false === this.sp.parent[CommandElseIf.KEY]
        this.sp.visible = this.sp.parent[CommandElse.KEY]
    }
}