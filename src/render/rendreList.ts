import { isObject } from "../util";

export function renderList<T>(val:any, render:Function):Array<T> {
    if (Array.isArray(val) || 'string' === typeof val) {
        return Array.from(val).map((v, i) => render(v, i))
    } else if('number' === typeof val){
        return Array.from({length:val}).map((v, i) => render(i+1, i))
    } else if(isObject(val)){
        return [].map.call(val, (k, i) => render(val[k], k, i))
    }
    return []
}