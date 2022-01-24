import React from 'react';
import { OnComplete } from './elapsed';
import { useCountUp } from './hooks/index';

export const DEFAULT_START = 0; // 默认从0开始
export const DEFAULT_END = 0; // 默认从0开始

export type ReturnValue = number | string | React.ReactNode;
export type AutoResetKey = any[];

export type EasingFn = (
  currentTime: number,
  startValue: number,
  changeInValue: number,
  duration: number,
) => number;

export type Easing =
  | 'easeInCubic'
  | 'easeOutCubic'
  | 'linear'
  | 'easeInQuad'
  | 'easeOutQuad'
  | 'easeInOutQuad'
  | 'easeOutBounce'
  | 'easeInOutCubic'
  | 'easeInOutElastic'
  | 'easeOutElastic'
  | 'easeInElastic'
  | 'easeInOutCirc'
  | 'easeInOutExpo'
  | 'easeOutExpo'
  | 'easeInQuart'
  | 'easeOutQuart'
  | 'easeOutCirc'
  | 'easeInCirc'
  | 'easeInExpo'
  | 'easeInOutSine'
  | 'easeInOutQuart'
  | 'easeOutSine'
  | 'easeInSine'
  | 'easeInQuint'
  | 'easeOutQuint'
  | 'easeInOutQuint'
  | EasingFn;

export type CountUpReturnProps = {
  /** value */
  value: ReturnValue;
  /** 重置方法 */
  reset: ReturnValue;
  rawValue: number;
};

export type CountUpProps = {
  /** 是否开启计算动画，默认开启 */
  isCounting?: boolean;
  /** 开始值 */
  start?: number;
  /** 结束值 */
  end?: number;
  /** 时间 毫秒为单位 */
  duration?: number;
  /** 小数位数。默认值:0 */
  decimalPlaces?: number;
  /** 值前缀 */
  prefix?: string;
  /** 值后缀 */
  suffix?: string;
  /** 结束后回调 */
  onComplete?: (totalElapsedTime: number) => OnComplete | void;
  /**  动画类型 'easeOutCubic' | 'easeInCubic' | 'linear' | EasingFn */
  easing?: Easing;
  /** 渲染项 */
  render?: (props: CountUpReturnProps) => ReturnValue; //
  /** 监听参数，参数改变动画重新开始 */
  autoResetKey?: AutoResetKey;
};

const CountUp = (props: CountUpProps) => {
  const { render } = props;
  const newDuration = props?.duration ? props?.duration / 1000 : 0;
  const countUpProps = useCountUp({
    ...props,
    duration: newDuration,
  });

  return <>{typeof render === 'function' ? render(countUpProps) : countUpProps.value}</>;
};

export default CountUp;
