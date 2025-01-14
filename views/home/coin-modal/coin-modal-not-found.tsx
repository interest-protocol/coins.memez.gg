import { Div, H3, Img, P } from '@stylin.js/elements';
import { FC } from 'react';

const CoinModalNotFound: FC = () => (
  <Div
    gap="1.5rem"
    height="30rem"
    display="flex"
    alignItems="center"
    flexDirection="column"
    justifyContent="center"
  >
    <Img src="/not-found.png" width="11.25rem" height="11.25rem" />
    <Div gap="1rem" display="flex" textAlign="center" flexDirection="column">
      <H3 fontSize="2rem">Coin Not found</H3>
      <P color="#9B9CA1" maxWidth="25rem">
        Nothing to show, verify your internet connection or probably there a bad
        parameter on the url
      </P>
    </Div>
  </Div>
);

export default CoinModalNotFound;
