/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
export function noop (a?: any, b?: any, c?: any) {}
// can we use __proto__?
export const hasProto = '__proto__' in {}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
export function isObject (obj:any): boolean {
    return obj !== null && typeof obj === 'object'
}  

/**
 * Convert a value to a string that is actually rendered.
 */
export function toString (val: any): string {
    return val == null 
        ? ''
        : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
            ? JSON.stringify(val, null, 2)
            : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
export function toNumber (val: string): number | string {
    const n = Number(val)
    return isNaN(n) || ''===val ? val : n
}
  
/**
 * Get the raw type string of a value, e.g., [object Object].
 */
const _toString = Object.prototype.toString
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
export function isPlainObject (obj: any): boolean {
    return _toString.call(obj) === '[object Object]'
}

export function isRegExp (v: any): boolean {
    return _toString.call(v) === '[object RegExp]'
}

export * from './lang'
