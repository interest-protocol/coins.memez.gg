import { Div, H3, Img, P } from '@stylin.js/elements';
import { FC, useMemo } from 'react';

import WalletGuardedButton from '@/components/wallet-guarded-button';
import { useLocalMeMode } from '@/hooks/use-local-me-mode';

const CoinCardListEmpty: FC = () => {
  const [localMeMode] = useLocalMeMode();

  const currentAccount = useMemo(
    () => ({
      address:
        '0x1eb7c567d5fcc99140007716d4235e2c72a4b65a7b89197f15fb73c2fb57d3d9',
    }),
    []
  );

  return (
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
        <H3 fontSize="2rem">No Coins Listed</H3>
        <P color="#9B9CA1">
          No coins to show, try to clear your filters or refresh the page
        </P>
      </Div>
      {localMeMode && !currentAccount && (
        <WalletGuardedButton maxWidth="15rem" width="100%" />
      )}
    </Div>
  );
};

export default CoinCardListEmpty;
