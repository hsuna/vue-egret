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

export * from './lang'
