import { FieldPath } from 'react-hook-form';

import { ICreateCoin, Step } from '../../create-coin.types';

export const STEP_VALIDATION: Record<
  Step.Details | Step.Supply | Step.Features,
  ReadonlyArray<FieldPath<ICreateCoin>>
> = {
  [Step.Details]: ['name', 'symbol', 'description', 'imageUrl'],
  [Step.Supply]: ['decimals', 'supply'],
  [Step.Features]: ['maxSupply'],
};
