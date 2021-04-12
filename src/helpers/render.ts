import { genVNode } from 'src/render/gen';
import ParserFactory from '../parser';

export function astStrRender(template: string): string {
  // 通过模板解析，将模板转化为AST
  const ast: string = genVNode(ParserFactory.created(template).root);
  return `with(this){ return ${ast};}`;
}
