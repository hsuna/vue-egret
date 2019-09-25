export interface Throttle {
    (): void;
    cancel?: Function;
}
export interface ThrottleOptions {
    leading?: boolean;
    trailing?: boolean;
}
export declare function throttle(func: Function, wait: number, options?: ThrottleOptions): Throttle;
export interface Debounce {
    (): string;
    cancel?: Function;
}
export declare function debounce(func: Function, wait: number, immediate?: boolean): Debounce;
