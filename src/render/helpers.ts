import { isObject, isPlainObject, toObject, makeMap, hasSymbol } from '../util';
import { createFnInvoker, VNodeInvoker, VNode } from './v-node';

/**
 * Check if a tag is a built-in tag.
 */
export const isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
export const isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
export function bindObjectProps(data: VNode, value: Record<string, any>, isSync?: boolean): VNode {
  if (value) {
    if (!isObject(value)) {
      // console.warn('v-bind without argument expects an Object or Array value');
    } else {
      if (Array.isArray(value)) {
        value = toObject<any>(value);
      }
      const attrs: Record<string, any> = data.attrs || (data.attrs = {});
      for (const key in value) {
        attrs[key] = value[key];

        if (isSync) {
          const on: Record<string, VNodeInvoker> = data.on || (data.on = {});
          on[`update:${key}`] = createFnInvoker(function ($event: any) {
            value[key] = $event;
          });
        }
      }
    }
  }
  return data;
}

export function bindObjectListeners(data: VNode, value: any): VNode {
  if (value) {
    if (!isPlainObject(value)) {
      // warn：'v-bind without argument expects an Object or Array value'
    } else {
      const on = (data.on = { ...data.on });
      for (const key in value) {
        const existing = on[key];
        const ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data;
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
export function prependModifier(value: any, symbol: string): any {
  return typeof value === 'string' ? symbol + value : value;
}

/**
 * 列表渲染
 * @author Hsuna
 * @param { any } val   渲染数据，可递归数据
 * @param { Function } render     渲染函数
 * @return { Array<T> } 渲染后列表
 */
export function renderList<T>(val: any, render: Function): Array<T> {
  if (Array.isArray(val) || 'string' === typeof val) {
    return Array.from(val).map((v, i) => render(v, i));
  } else if ('number' === typeof val) {
    return Array.from({ length: val }).map((v, i) => render(i + 1, i));
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      const ret = [];
      const iterator: Iterator<any> = val[Symbol.iterator]();
      let result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
      return ret;
    } else {
      return Object.keys(val).map((k: string | number, i: number) => render(val[k], k, i));
    }
  }
  return [];
}
