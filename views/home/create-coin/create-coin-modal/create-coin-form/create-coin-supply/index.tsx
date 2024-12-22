import { Div } from '@stylin.js/elements';
import { FC } from 'react';

import CreateCoinField from '../../../create-coin-field';

const CreateCoinSupply: FC = () => {
  return (
    <Div display="flex" flexDirection="column" gap="0.5rem">
      <CreateCoinField
        kind="numeric"
        name="decimals"
        placeholder="9"
        label="Decimals"
      />
      <CreateCoinField
        name="supply"
        label="Supply"
        kind="numeric"
        placeholder="100000000"
      />
    </Div>
  );
};

export default CreateCoinSupply;
