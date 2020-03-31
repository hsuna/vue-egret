import ParserFactory from "../parser";
import { genVNode } from "../render/v-node";

export function astStrRender(template:string):string {
  // 通过模板解析，将模板转化为AST
  let ast:string = genVNode(ParserFactory.created(template).root);
  return `with(this){ return ${ast};}`;
}