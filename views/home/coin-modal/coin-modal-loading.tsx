import { Div } from '@stylin.js/elements';
import { FC } from 'react';

import { LoaderSVG } from '@/components/svg';

const CoinModalLoading: FC = () => (
  <Div
    height="30rem"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <LoaderSVG />
  </Div>
);

export default CoinModalLoading;
