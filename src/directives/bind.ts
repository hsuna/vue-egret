import { AstData, VNodeDirective } from '../render/v-node';

export default function bind(data: AstData, dir: VNodeDirective) {
  data.wrapDir.push((code: string) => {
    return `_b(${code},${dir.expression}${dir.modifiers && dir.modifiers.sync ? ',true' : ''})`;
  });
}
