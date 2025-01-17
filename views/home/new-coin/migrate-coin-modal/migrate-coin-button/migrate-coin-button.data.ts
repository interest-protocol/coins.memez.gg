import { FieldPath } from 'react-hook-form';

import { IMigrateCoin, Step } from '../migrate-coin.types';

export const STEP_VALIDATION: Record<
  Step.Features,
  ReadonlyArray<FieldPath<IMigrateCoin>>
> = {
  [Step.Features]: ['maxSupply'],
};
