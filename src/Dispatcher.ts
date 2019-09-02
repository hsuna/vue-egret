export interface ListenersType {
    propString: Function
}

export default class Dispatcher {
    _listeners: Function[]=[];
    _target: egret.Sprite;

    constructor(target) {
        this._listeners = [];
        this._target = target;
    }
    addEventListener(type, listener, thisArg) {
        if(!this._listeners[type]){
            this._listeners[type] = [listener];
            this._target["on"+type] = (function(evt){
                evt = evt || window.event;
                this._triggerEventListener.call(this, type,  evt, thisArg)
            }).bind(this);
        }else {
            this._listeners[type].push(listener);
        }
        return listener;
    }
    removeEventListener(type, listener) {
        let listeners = this._listeners[type];
        if(!listeners) return;
        let index = listeners.indexOf(listener);
        if(-1!=index) listeners.splice(index, 1);
        if(listeners.length <= 0){
            delete  this._listeners[type];
            this._target["on"+type] = null;
        }
    }
    hasEventListener(type) {
        let listeners = this._listeners[type];
        if(listeners&&listeners.length>0) return true;
        return false;
    }
    _triggerEventListener(type, evt, thisArg) {
        let listener;
        let listeners = this._listeners[type];
        if(!listeners) return;
        for(let i=0, l=listeners.length; i<l; i++){
            listener = listeners[i];
            listener&&listener.call(thisArg||this, evt);
        }
    }
}