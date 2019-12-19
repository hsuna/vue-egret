import { isObject } from "../util";

/**
 * 列表渲染
 * @author Hsuna
 * @param { any } val   渲染数据，可递归数据
 * @param { Function } render     渲染函数
 * @return { Array<T> } 渲染后列表
 */
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