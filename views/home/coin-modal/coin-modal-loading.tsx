import { Div } from '@stylin.js/elements';
import { FC } from 'react';

import { LoaderSVG } from '@/components/svg';

const CoinModalLoading: FC = () => (
  <Div
    flex="1"
    display="flex"
    maxHeight="100%"
    alignItems="center"
    justifyContent="center"
  >
    <LoaderSVG />
  </Div>
);

export default CoinModalLoading;
