/**
 * 函数节流
 * @param {Function} func 函数
 * @param {Number} wait 等待时间(ms)
 * @param {ThrottleOptions} options 选项 {leading: false, trailing: true}
 */
export interface Throttle {
  (): void;
  cancel?: Function;
}
export interface ThrottleOptions {
    leading?: boolean, 
    trailing?: boolean
}
export function throttle(func: Function, wait: number, options:ThrottleOptions={}): Throttle {
    let timeout:any, context:any, args:IArguments, result:any;
    // 上一次时间
    let previous:number = 0;
    let later:Function = function() {
        // 重置时间
        previous = options.leading === false ? 0 : Date.now();
        // 将定时器设置成null
        timeout = null;
        // 实现函数
        result = func.apply(context, args);
        // 进程不一，可能会导致timeout设置成null后，又被赋值的情况
        if (!timeout) context = args = null;
    }

    let throttled:Throttle = function() {
        const now:number = Date.now();
        // 如果previous为0，说明未进入周期
        // leading表示是否在开启周期时，调用函数，默认true
        if (!previous && options.leading === false) previous = now;
        // 周期剩余时间
        const remaining:number = wait - (now - previous);
        context = this;
        args = arguments;
        // 如果周期时间小于或等于0，说明进入下一周期
        // 而remaining大于wait，其实就是previous > now，表示客户端被修改了
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            // 缓存执行时间
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
            // 表示是否trailing表示是否执行函数
        } else if (!timeout && options.trailing !== false) {
            //trailing表示是否在关闭周期前，调用函数，默认true
            timeout = setTimeout(later, remaining);
        }    
        return result;  
    }  
    //关闭函数节流
    throttled.cancel = function() {
        //清除定时器之类的
        clearTimeout(timeout);
        previous = Date.now();
        timeout = context = args = null;
    }
    return throttled;
}

/**
 * 函数防抖
 * @param func 函数
 * @param wait 等待时间(ms)
 * @param immediate
 */
export interface Debounce {
  (): string;
  cancel?: Function;
}
export function debounce(func: Function, wait: number, immediate: boolean=false): Debounce {
  let timeout:any, result:any;

  let later:Function = function(context, args) {
    //清除计时器
    timeout = null;
    if (args) result = func.apply(context, args);
  };

  let debounced: Debounce = function(...args) {
    // 如果存在上一计时器，则清除，重新计时
    if (timeout) clearTimeout(timeout);
    // immediate表示执行前，先尝试调用一次函数，默认false
    if (immediate) {
        // 将timeout是否为null，提取出来
        var callNow = !timeout;
        // 这里先设置定时器，再判定callNow
        // 如果先判定callNow的话，那下一次进来时，timeout依然为null，这样判定就会有问题
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(this, args);
    } else {
        //延迟执行
        timeout = setTimeout(_ => later(this, args), wait);
    }

    return result;
  }

  //关闭定时器
  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}
