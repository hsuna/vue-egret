import Watcher from './watcher'
    
// dep实例的ID
let uid:number = 0

export default class Dep {
    static target: Watcher;
    id: number;
    subs: Array<Watcher>;

    constructor(){
        this.id = uid++
        this.subs = []    
    }

    depend() {
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }

    addSub(sub:Watcher) {
        this.subs.push(sub)
    }

    removeSub(sub:Watcher) {
        const index = this.subs.indexOf(sub)
        if (index > -1) {
            this.subs.splice(index, 1)
        }
    }

    notify() {
        this.subs.forEach(e => {
            e.update()
        })
    }
}

// Dep.target为watcher实例
Dep.target = null