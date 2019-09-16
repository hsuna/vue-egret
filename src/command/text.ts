import { CommandBase } from './index'
import Watcher from '../observer/watcher'

export class CommandText extends CommandBase{
    static REG:RegExp = /\{\{([^}]+)\}\}/g

    protected _addWatcher() {
        if(this.expOrFn){
            this.expOrFn.replace(CommandText.REG, (_:any, expOrFn:string) => {
                new Watcher(this.vm, expOrFn, this.update.bind(this))
                return expOrFn
            })
        }
    }

    implement() {
        this.sp['text'] = this.expOrFn.replace(CommandText.REG, (_:any, expOrFn:string) => this.generate(expOrFn))
    }
}