import on from './on';
import bind from './bind';
import { AstData } from 'src/render/util';
import { VNode, VNodeDirective } from 'src/render/v-node';

export type DirectiveHook = (sp: egret.DisplayObject, dir: VNodeDirective, vnode: VNode) => void;

export type DirectiveFunction = (data: AstData, dir: VNodeDirective) => any;

export interface DirectiveOptions {
  bind: DirectiveHook;
  inserted?: DirectiveHook;
  update: DirectiveHook;
  componentUpdated?: DirectiveHook;
  unbind?: DirectiveHook;
}

export function normalizeDirectives(dirs: Array<VNodeDirective>): Record<string, VNodeDirective> {
  return dirs.reduce(
    (obj: Record<string, VNodeDirective>, dir: VNodeDirective) => ((obj[dir.name] = dir), obj),
    {},
  );
}

export default {
  on,
  bind,
};
