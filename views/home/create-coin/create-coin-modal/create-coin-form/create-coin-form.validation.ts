import * as yup from 'yup';

import { MAX_U64 } from '@/constants';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';

import { ICreateCoin } from '../../create-coin.types';

export const createCoinSchema = yup.object<ICreateCoin>({
  name: yup.string().required('Name is a required field'),
  symbol: yup
    .string()
    .required('Symbol is a required field')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field'),
  description: yup
    .string()
    .required('You must provide a description')
    .notOneOf(
      [yup.ref('name'), yup.ref('symbol')],
      'The description must be different than the name and symbol'
    ),
  imageUrl: yup.string(),
  decimals: yup
    .number()
    .min(0, 'You cannot add numbers less than 0')
    .max(18, 'You cannot add numbers greater than 18'),
  supply: yup
    .number()
    .required('Total Supply is a required field')
    .min(0, 'You cannot input numbers inferior than 0')
    .test('max', 'Supply exceed the u64 max amount', function (value) {
      const { decimals } = this.parent;
      const bnValue = FixedPointMath.toBigNumber(Number(value), decimals);
      return bnValue.lte(MAX_U64);
    }),
  maxSupply: yup
    .number()
    .test(
      'min',
      'Max Supply should be superior than current supply',
      function (value) {
        const { supply, features } = this.parent;

        return features?.mintable && Number(supply) <= Number(value);
      }
    )
    .test('max', 'Max Supply exceed the u64 max amount', function (value) {
      const { decimals } = this.parent;
      const bnValue = FixedPointMath.toBigNumber(Number(value), decimals);
      return bnValue.lte(MAX_U64);
    }),
  features: yup.object({
    mintable: yup.boolean(),
    burnable: yup.boolean(),
    editable: yup.boolean(),
    all: yup.boolean(),
  }),
});
