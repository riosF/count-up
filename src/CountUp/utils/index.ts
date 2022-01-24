import type { Easing } from '../index';

// 动画文件
const linear = (t: number, b: number, c: number, d: number): number => {
  return (c * t) / d + b;
};
function easeInQuad(t: number, b: number, c: number, d: number) {
  return c * (t /= d) * t + b;
}

function easeOutQuad(t: number, b: number, c: number, d: number) {
  return -c * (t /= d) * (t - 2) + b;
}

function easeInOutQuad(t: number, b: number, c: number, d: number) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
  return (-c / 2) * (--t * (t - 2) - 1) + b;
}

function easeInCubic(t: number, b: number, c: number, d: number) {
  return c * (t /= d) * t * t + b;
}
function easeOutCubic(t: number, b: number, c: number, d: number) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}
function easeInOutCubic(t: number, b: number, c: number, d: number) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
  return (c / 2) * ((t -= 2) * t * t + 2) + b;
}
function easeInQuart(t: number, b: number, c: number, d: number) {
  return c * (t /= d) * t * t * t + b;
}
function easeOutQuart(t: number, b: number, c: number, d: number) {
  return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}
function easeInOutQuart(t: number, b: number, c: number, d: number) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b;
  return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
}
function easeInQuint(t: number, b: number, c: number, d: number) {
  return c * (t /= d) * t * t * t * t + b;
}
function easeOutQuint(t: number, b: number, c: number, d: number) {
  return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
}
function easeInOutQuint(t: number, b: number, c: number, d: number) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t * t + b;
  return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
}
function easeInSine(t: number, b: number, c: number, d: number) {
  return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
}
function easeOutSine(t: number, b: number, c: number, d: number) {
  return c * Math.sin((t / d) * (Math.PI / 2)) + b;
}
function easeInOutSine(t: number, b: number, c: number, d: number) {
  return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
}
function easeInExpo(t: number, b: number, c: number, d: number) {
  return t === 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
}
function easeOutExpo(t: number, b: number, c: number, d: number) {
  return t === d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
}
function easeInOutExpo(t: number, b: number, c: number, d: number) {
  if (t === 0) return b;
  if (t === d) return b + c;
  if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
  return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
}
function easeInCirc(t: number, b: number, c: number, d: number) {
  return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
}
function easeOutCirc(t: number, b: number, c: number, d: number) {
  return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
}
function easeInOutCirc(t: number, b: number, c: number, d: number) {
  if ((t /= d / 2) < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
  return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
}
function easeInElastic(t: number, b: number, c: number, d: number) {
  let s = 1.70158;
  let p = 0;
  let a = c;
  if (t === 0) return b;
  if ((t /= d) === 1) return b + c;
  if (!p) p = d * 0.3;
  if (a < Math.abs(c)) {
    a = c;
    s = p / 4;
  } else s = (p / (2 * Math.PI)) * Math.asin(c / a);
  return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b;
}
function easeOutElastic(t: number, b: number, c: number, d: number) {
  let s = 1.70158;
  let p = 0;
  let a = c;
  if (t === 0) return b;
  if ((t /= d) === 1) return b + c;
  if (!p) p = d * 0.3;
  if (a < Math.abs(c)) {
    a = c;
    s = p / 4;
  } else s = (p / (2 * Math.PI)) * Math.asin(c / a);
  return a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) + c + b;
}
function easeInOutElastic(t: number, b: number, c: number, d: number) {
  let s = 1.70158;
  let p = 0;
  let a = c;
  if (t === 0) return b;
  if ((t /= d / 2) === 2) return b + c;
  if (!p) p = d * (0.3 * 1.5);
  if (a < Math.abs(c)) {
    a = c;
    s = p / 4;
  } else s = (p / (2 * Math.PI)) * Math.asin(c / a);
  if (t < 1)
    return (
      -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b
    );
  return (
    a * Math.pow(2, -10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) * 0.5 + c + b
  );
}

function easeOutBounce(t: number, b: number, c: number, d: number) {
  if ((t /= d) < 1 / 2.75) {
    return c * (7.5625 * t * t) + b;
  } else if (t < 2 / 2.75) {
    return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
  } else if (t < 2.5 / 2.75) {
    return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
  } else {
    return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
  }
}

export const easings = {
  easeInCubic,
  easeOutCubic,
  linear,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeOutBounce,
  easeInOutCubic,
  easeInOutElastic,
  easeOutElastic,
  easeInElastic,
  easeInOutCirc,
  easeInOutExpo,
  easeOutExpo,
  easeInQuart,
  easeOutQuart,
  easeOutCirc,
  easeInCirc,
  easeInExpo,
  easeInOutSine,
  easeInOutQuart,
  easeOutSine,
  easeInSine,
  easeInQuint,
  easeOutQuint,
  easeInOutQuint,
};

export const defaultEasing = easings.easeOutQuint;

export const getEasing = (easing: Easing) => {
  return typeof easing === 'function' ? easing : easings[easing];
};
