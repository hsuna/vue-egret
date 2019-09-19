import { createVNode } from "../parser/v-node";
import { toNumber, toString } from "../util";
import { renderList } from "./rendreList";


export function installRender (target: any) {
    target._c = createVNode
    target._n = toNumber
    target._s = toString
    target._l = renderList
  }
  