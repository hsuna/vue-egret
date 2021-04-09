import { RefData } from '..';

export type TweenType = 'set' | 'to' | 'wait';

export interface TweenData extends Array<any> {
  [0]: TweenType;
}

/**
 * 动画Promise包装
 * @description 用于检测egret.Tween是否被安装，且空值时，返回this的Tween
 * @author Hsuna
 * @param { Array<TweenData> } params 运动参数
 * - egret.Tween.set: ['set', :props]
 * - egret.Tween.to: ['to', :props, :duration?, :ease?]
 * - egret.Tween.wait: ['wait', :duration, :passive?]
 * @param { RefData } target 可选，运动对象
 * @return { Promise<egret.Tween> }
 */
export function tween(params: Array<TweenData> = [], target?: RefData): Promise<egret.Tween> {
  if ('Tween' in egret) {
    return new Promise((resolve: (value: egret.Tween) => void) => {
      let t: egret.Tween = egret.Tween.get(target || this);
      params.forEach(([name, ...args]: TweenData) => {
        if ('function' === typeof t[name]) t = t[name](...(args as [string])); // 至少要一个参数，所以这里拆成arg0和args
      });
      t.call(resolve, this, [t]);
    });
    //return tween instanceof egret.Tween ? tween : ;
  } else throw 'The egret.Tween.js not import!!!';
}
