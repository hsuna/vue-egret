import { AstData, VNodeDirective } from '../render/v-node';

export default function on(data: AstData, dir: VNodeDirective) {
  data.wrapDir.push((code: string) => `_g(${code},${dir.expression})`);
}
