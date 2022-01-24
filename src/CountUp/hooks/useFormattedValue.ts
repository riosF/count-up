import type { CountUpProps } from '../index';

export const DEFAULT_START = 0;
export type ReturnValue = number | string | React.ReactNode;

// 千分位
const addThousandsSeparator = (value: string, separator: string) =>
  value.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

// 前后缀
const addPrefixSuffix = (prefix: string, value: string, suffix: string) =>
  `${prefix}${value}${suffix}`;

const getDecimalPartLength = (num: number) => (num.toString().split('.')[1] || '').length;

const getDefaultDecimalPlaces = (start: number, end?: number) => {
  const startDecimals = getDecimalPartLength(start);
  const endDecimals = getDecimalPartLength(end || 1);

  return startDecimals >= endDecimals ? startDecimals : endDecimals;
};

export const useFormattedValue = (
  rawValue: number,
  {
    start = DEFAULT_START,
    end,
    decimalPlaces = getDefaultDecimalPlaces(start, end),
    prefix = '',
    suffix = '',
  }: CountUpProps,
) => {
  const thousandsSeparator = ',';
  const getBaseValueFormatting = () => {
    if (decimalPlaces === 0) {
      const valueStr = Math.round(rawValue).toString();
      return addThousandsSeparator(valueStr, thousandsSeparator);
    }

    const [int, decimals] = rawValue.toFixed(decimalPlaces).split('.');
    const intFormatted = addThousandsSeparator(int, thousandsSeparator);
    return `${intFormatted}.${decimals}`;
  };

  const value = getBaseValueFormatting();
  return addPrefixSuffix(prefix, value, suffix);
};
