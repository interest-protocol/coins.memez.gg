import {
  normalizeStructTag,
  normalizeSuiAddress,
  SUI_TYPE_ARG,
} from '@mysten/sui/utils';

export const isSameStructTag = (tagA: string, tagB: string) =>
  normalizeStructTag(tagA) === normalizeStructTag(tagB);

export const isSui = (type: string) => isSameStructTag(type, SUI_TYPE_ARG);

export const isSameAddress = (addressA: string, addressB: string) =>
  normalizeSuiAddress(addressA) === normalizeSuiAddress(addressB);
