import { ChangeEvent } from 'react';

import { MAX_NUMBER } from '@/constants';

const isExponential = (number: number) => number.toString().includes('e');

const removeZero = (array: ReadonlyArray<string>): string => {
  if (!array.length) return '';

  if (array[array.length - 1] == '0') return removeZero(array.slice(0, -1));

  return array.join('');
};

export const removeUnnecessaryZeros = (string: string): string =>
  string.includes('.') ? removeZero(string.split('')) : string;

const treatMoneyDecimals = (
  money: number,
  maxDecimals: number,
  allowK: boolean
) => {
  const [integralPart, decimalPart] = (
    isExponential(money)
      ? removeUnnecessaryZeros(money.toFixed(maxDecimals))
      : money.toString()
  ).split('.');

  const integralDigits = integralPart.toString().length;

  const newMoney = Number(
    integralDigits > 12
      ? `${integralPart.slice(0, -12)}.${integralPart.slice(-12, -10)}`
      : integralDigits > 9
        ? `${integralPart.slice(0, -9)}.${integralPart.slice(-9, -7)}`
        : integralDigits > 6
          ? `${integralPart.slice(0, -6)}.${integralPart.slice(-6, -4)}`
          : integralDigits > 3
            ? allowK
              ? `${integralPart.slice(0, -3)}.${integralPart.slice(-3, -1)}`
              : `${integralPart}.${
                  +integralPart >= 10
                    ? (decimalPart?.slice(0, 2) ?? 0)
                    : (decimalPart ?? 0)
                }`
            : `${integralPart}.${
                +integralPart >= 10
                  ? (decimalPart?.slice(0, 2) ?? 0)
                  : (decimalPart ?? 0)
              }`
  );

  const newMoneyString = isExponential(newMoney)
    ? removeUnnecessaryZeros(newMoney.toFixed(maxDecimals - integralDigits))
    : newMoney.toPrecision();

  const baseDecimals = integralDigits > 6 ? 0 : 2;

  const decimalDigits =
    integralDigits <= 6 && +integralPart >= 10
      ? 2
      : (newMoneyString.split('.')[1]?.length ?? baseDecimals);

  return {
    newMoney,
    decimalDigits,
    integralDigits,
  };
};

export const formatMoney = (
  money: number,
  maxFractionDigits = 20,
  allowK: boolean = false
): string => {
  const { integralDigits, newMoney, decimalDigits } = treatMoneyDecimals(
    money,
    maxFractionDigits,
    allowK
  );

  const maximumFractionDigits =
    decimalDigits < maxFractionDigits ? decimalDigits : maxFractionDigits;

  const minimumFractionDigits =
    decimalDigits > maximumFractionDigits
      ? maximumFractionDigits
      : decimalDigits;

  return `${new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(newMoney)}${
    integralDigits > 12
      ? 'T'
      : integralDigits > 9
        ? 'B'
        : integralDigits > 6
          ? 'M'
          : integralDigits > 3
            ? allowK
              ? 'K'
              : ''
            : ''
  }`.slice(1);
};

export const formatDollars = (money: number, max = 6): string =>
  '$' + formatMoney(money, max);

export const commaSeparatedNumber = (value: number) =>
  Intl.NumberFormat('de-DE').format(value).replace(/\./g, ',');

export const parseInputEventToNumberString = (
  event: ChangeEvent<HTMLInputElement>,
  max: number = MAX_NUMBER
): string => {
  const value = event.target.value;

  const x =
    isNaN(+value[value.length - 1]) && value[value.length - 1] !== '.'
      ? value.slice(0, value.length - 1)
      : value;

  if (isNaN(+x)) return '';

  if (+x < 0) return '0';

  if (+x >= max) return max.toString();

  if (x.charAt(0) == '0' && !x.startsWith('0.')) return String(Number(x));

  if (
    value.includes('.') &&
    value[value.length - 1] !== '.' &&
    value[value.length - 1] !== '0'
  )
    return (+parseFloat(x).toFixed(6)).toPrecision();

  return x;
};
