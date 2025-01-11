import { useCurrentAccount } from '@mysten/dapp-kit';
import { Div, H3, Img, P } from '@stylin.js/elements';
import { FC } from 'react';

import WalletGuardedButton from '@/components/wallet-guarded-button';
import { useLocalMeMode } from '@/hooks/use-local-me-mode';

const CoinCardListEmpty: FC = () => {
  const [localMeMode] = useLocalMeMode();
  const currentAccount = useCurrentAccount();

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
