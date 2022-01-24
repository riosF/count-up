import type { CountUpProps, CountUpReturnProps } from '../index';
import { useFormattedValue } from '../hooks/useFormattedValue';
import { getEasing, defaultEasing } from '../utils/index';
import { useElapsedTime } from '../elapsed';
import { useEffect } from 'react';

export const DEFAULT_DURATION = 2; // 默认为2s
export const DEFAULT_START = 0; // 默认从0开始

const getDuration = (end?: number, duration?: number) => {
  if (typeof end !== 'number') {
    return undefined;
  }
  return typeof duration === 'number' ? duration : DEFAULT_DURATION;
};

const useCountUp = (props: CountUpProps): CountUpReturnProps => {
  const {
    isCounting = true,
    start = DEFAULT_START,
    end,
    duration,
    easing = defaultEasing,
    onComplete,
    autoResetKey,
  } = props;

  const durationValue = getDuration(end, duration);

  const { elapsedTime, reset } = useElapsedTime({
    isPlaying: isCounting,
    duration: durationValue,
    onComplete,
  });

  useEffect(() => {
    reset();
  }, [autoResetKey, reset]);

  let rawValue;

  if (durationValue === 0 && typeof end === 'number') {
    rawValue = end;
  } else if (typeof end === 'number' && typeof durationValue === 'number') {
    const easingFn = getEasing(easing);
    const time = elapsedTime < durationValue ? elapsedTime : durationValue;
    rawValue = easingFn(time, start, end - start, durationValue);
  } else {
    rawValue = start + elapsedTime;
  }

  const value = useFormattedValue(rawValue, props);

  return { value, reset, rawValue };
};

export { useCountUp };
