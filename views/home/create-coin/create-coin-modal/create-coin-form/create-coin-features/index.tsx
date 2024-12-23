import { Div } from '@stylin.js/elements';
import { FC } from 'react';

import CreateCoinFeaturesAll from './create-coin-features-all';
import CreateCoinFeaturesBurnable from './create-coin-features-burnable';
import CreateCoinFeaturesEditable from './create-coin-features-editable';
import CreateCoinFeaturesMintable from './create-coin-features-mintable';

const CreateCoinFeatures: FC = () => (
  <Div display="flex" flexDirection="column" gap="1rem">
    <CreateCoinFeaturesBurnable />
    <CreateCoinFeaturesMintable />
    <CreateCoinFeaturesEditable />
    <CreateCoinFeaturesAll />
  </Div>
);

export default CreateCoinFeatures;
