import Watcher from './watcher';

// dep实例的ID
let uid = 0;

export default class Dep {
  static target: Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor() {
    this.id = uid++;
    this.subs = [];
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  addSub(sub: Watcher) {
    this.subs.push(sub);
  }

  removeSub(sub: Watcher) {
    const index = this.subs.indexOf(sub);
    if (index > -1) {
      this.subs.splice(index, 1);
    }
  }

  notify() {
    this.subs.forEach((e) => {
      e.update();
    });
  }
}

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
const targetStack = [];

export function pushTarget(target?: Watcher) {
  targetStack.push(target);
  Dep.target = target;
}

export function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
