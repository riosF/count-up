import { useState, useRef, useCallback } from 'react';
import { useIsomorphicEffect } from './useIsomorphicEffect';

type MayBe<T> = T | null;

export interface ElapsedType {
  elapsedTime: number;
  reset: (newStartAt?: number) => void;
}

export interface OnComplete {
  shouldRepeat?: boolean;
  delay?: number;
  newStartAt?: number;
}

export interface Props {
  isPlaying?: boolean;
  duration?: number;
  startAt?: number;
  updateInterval?: number;
  onComplete?: (totalElapsedTime: number) => OnComplete | void;
  onUpdate?: (elapsedTime: number) => void;
}

export const useElapsedTime = ({
  isPlaying = true,
  duration,
  startAt = 0,
  updateInterval = 0,
  onComplete,
  onUpdate,
}: Props): ElapsedType => {
  const [displayTime, setDisplayTime] = useState(startAt);
  const elapsedTimeRef = useRef(0);
  const startAtRef = useRef(startAt);
  const totalElapsedTimeRef = useRef(startAt * -1000);
  const requestRef = useRef<MayBe<number>>(null);
  const previousTimeRef = useRef<MayBe<number>>(null);
  const repeatTimeoutRef = useRef<any>(null);

  const loop = useCallback(
    (time: number) => {
      const timeSec = time / 1000;
      if (previousTimeRef.current === null) {
        previousTimeRef.current = timeSec;
        requestRef.current = requestAnimationFrame(loop);
        return;
      }

      const deltaTime = timeSec - previousTimeRef.current;
      const currentElapsedTime = elapsedTimeRef.current + deltaTime;

      previousTimeRef.current = timeSec;
      elapsedTimeRef.current = currentElapsedTime;

      const currentDisplayTime =
        startAtRef.current +
        (updateInterval === 0
          ? currentElapsedTime
          : ((currentElapsedTime / updateInterval) | 0) * updateInterval);

      const totalTime = startAtRef.current + currentElapsedTime;
      const isCompleted = typeof duration === 'number' && totalTime >= duration;
      setDisplayTime(isCompleted ? duration! : currentDisplayTime);

      if (!isCompleted) {
        requestRef.current = requestAnimationFrame(loop);
      }
    },
    [duration, updateInterval],
  );

  const cleanup = () => {
    requestRef.current && cancelAnimationFrame(requestRef.current);
    repeatTimeoutRef.current && clearTimeout(repeatTimeoutRef.current);
    previousTimeRef.current = null;
  };

  const reset = useCallback(
    (newStartAt?: number) => {
      cleanup();

      elapsedTimeRef.current = 0;
      const nextStartAt = typeof newStartAt === 'number' ? newStartAt : startAt;
      startAtRef.current = nextStartAt;
      setDisplayTime(nextStartAt);

      if (isPlaying) {
        requestRef.current = requestAnimationFrame(loop);
      }
    },
    [isPlaying, loop, startAt],
  );

  useIsomorphicEffect(() => {
    onUpdate?.(displayTime);

    if (duration && displayTime >= duration) {
      totalElapsedTimeRef.current += duration * 1000;

      const {
        shouldRepeat = false,
        delay = 0,
        newStartAt,
      } = onComplete?.(totalElapsedTimeRef.current / 1000) || {};

      if (shouldRepeat) {
        repeatTimeoutRef.current = setTimeout(() => reset(newStartAt), delay * 1000);
      }
    }
  }, [displayTime, duration]);

  useIsomorphicEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(loop);
    }

    return cleanup;
  }, [isPlaying, duration, updateInterval]);

  return { elapsedTime: displayTime, reset };
};
