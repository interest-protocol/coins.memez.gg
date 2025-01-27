import { FieldPath } from 'react-hook-form';

import { IMigrateCoin, Step } from '../migrate-coin.types';

export const STEP_VALIDATION: Record<
  Step.Features | Step.Select,
  ReadonlyArray<FieldPath<IMigrateCoin>>
> = {
  [Step.Select]: ['name', 'symbol'],
  [Step.Features]: ['maxSupply'],
};
