import { VueEgretVM } from '../index'

export interface IHandle{
    implement(vm:VueEgretVM, sp:egret.DisplayObjectContainer, name:string, expOrFn:any);
    update(vm:VueEgretVM, sp:egret.DisplayObjectContainer, name:string, expOrFn:any, newVal, oldVal);
}

export interface IHandles{
    on:IHandle;
    bind:IHandle;
    model:IHandle;
    text:IHandle;
}

// 针对各种指令的回调函数
const handles:IHandles = {
    on: {
        implement(vm:VueEgretVM, sp:egret.DisplayObjectContainer, name:string, expOrFn:any) {
            sp.addEventListener(name, vm[expOrFn], vm)
        },
        update(vm:VueEgretVM, sp:egret.DisplayObjectContainer, name:string, expOrFn:any, newVal, oldVal) {
        }
    },
    bind: {
        implement(vm:VueEgretVM, sp:egret.DisplayObjectContainer, name:string, expOrFn:any) {
            sp[name] = vm[expOrFn]
        }, 
        update(vm:VueEgretVM, sp:egret.DisplayObjectContainer, name:string, expOrFn:any, newVal, oldVal) {
            sp[name] = newVal
        }
    },
    model: {
        implement(vm:VueEgretVM, sp:egret.DisplayObjectContainer, name:string, expOrFn:any) {
            sp['value'] = vm[expOrFn]
            sp.addEventListener('change', function() {
                vm[expOrFn] = this.value
            }, vm)
        },  
        update(vm:VueEgretVM, sp:egret.DisplayObjectContainer, name:string, expOrFn:any, newVal, oldVal) {
            sp['value'] = newVal
        }
    },
    text: {
        implement(vm:VueEgretVM, sp:egret.DisplayObjectContainer, name:string, expOrFn:any) {
            sp['text'] = vm['text'].replace(/\{\{([^}]+)\}\}/g, (_:any, w:string) => vm[w])
        }, 
        update(vm:VueEgretVM, sp:egret.DisplayObjectContainer, name:string, expOrFn:any, newVal, oldVal) {
            sp['text'] = vm['text'].replace(`{{${name}}}`, newVal).replace(/\{\{([^}]+)\}\}/g, (_:any, w:string) => vm[w])
        }
    }
}
export default handles