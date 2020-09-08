import { isPlainObject } from "./index";
import { Component, PropData } from "../index";

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 * eg: Boolean => function Boolean() { [native code] } => 'Boolean'
 */
function getType (fn:any):string {
    const match = fn && fn.toString().match(/^\s*function (\w+)/)
    return match ? match[1] : ''
}

export function isSameType (a:any, b:any):boolean {
    return getType(a) === getType(b)
}

export function checkType(type:Function, expectedTypes:Array<any>|any): boolean {
    const eTypes:Array<any> = Array.isArray(expectedTypes) ? expectedTypes : [expectedTypes]
    return eTypes.some(eType => isSameType(eType, type))
}

export function normalizeProp(
    propsOptions: Array<string>|Record<string, PropData|Function>
): Record<string, PropData> {
    let props:Record<string, PropData> = {}
    let val:string|PropData|Function;
    if(Array.isArray(propsOptions)) {
        for(let i=propsOptions.length-1; i>=0; i--) {
            val = propsOptions[i];
            if (typeof val === 'string') {
                props[val] = { type: null };
            }
        }
    } else {
        for(let key in propsOptions) {
            val = propsOptions[key];
            props[key] = isPlainObject(val) 
                ? val as PropData 
                : { type: val as Function };
        }
    }
    return props;
}

export function validateProp(
    options:PropData, 
    vm?:Component
){
    if('object' === typeof options && options.type){
        if(typeof options.default === 'function'){
            if(!checkType(Function, options.type)) return options.default.call(vm)
        }else if(typeof options.default === 'undefined'){
            if(checkType(String, options.type)) return ''
            else if(checkType(Number, options.type)) return 0
            else if(checkType(Boolean, options.type)) return false
            else if(checkType(Array, options.type)) return []
            else if(checkType(Object, options.type)) return {}
        }
        return options.default;
    }
    return options;
}