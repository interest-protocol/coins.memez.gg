import { Div } from '@stylin.js/elements';
import { FC } from 'react';

import MigrateCoinFeaturesAll from './migrate-coin-features-all';
import MigrateCoinFeaturesBurnable from './migrate-coin-features-burnable';
import MigrateCoinFeaturesEditable from './migrate-coin-features-editable';
import MigrateCoinFeaturesMintable from './migrate-coin-features-mintable';

const MigrateCoinFeatures: FC = () => (
  <Div display="flex" flexDirection="column" gap="1rem">
    <MigrateCoinFeaturesBurnable />
    <MigrateCoinFeaturesMintable />
    <MigrateCoinFeaturesEditable />
    <MigrateCoinFeaturesAll />
  </Div>
);

export default MigrateCoinFeatures;
