import * as yup from 'yup';

import { IEditForm } from '../coin-edit.types';

export const editCoinSchema = yup.object<IEditForm>({
  name: yup.string().required('Name is a required field'),
  symbol: yup
    .string()
    .required('Symbol is a required field')
    .matches(
      /^[a-zA-Z][\x21-\x7E]*$/,
      'This symbol is not following ASCII pattern'
    ),
  description: yup
    .string()
    .required('You must provide a description')
    .notOneOf(
      [yup.ref('name'), yup.ref('symbol')],
      'The description must be different than the name and symbol'
    ),
  imageUrl: yup.string(),
});
