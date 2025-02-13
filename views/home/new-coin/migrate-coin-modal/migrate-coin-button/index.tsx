import { Button, Img } from '@stylin.js/elements';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { LoaderSVG } from '@/components/svg';
import WalletGuardedButton from '@/components/wallet-guarded-button';
import { ExplorerMode } from '@/constants';
import { MIGRATE_COIN_FEE_MAP } from '@/constants/fee';
import { useDialog } from '@/hooks/use-dialog';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { useNetwork } from '@/hooks/use-network';

import { NEXT_BUTTON_TEXT, NEXT_STEP } from '../migrate-coin.data';
import { IMigrateCoin, Step } from '../migrate-coin.types';
import { STEP_VALIDATION } from './migrate-coin-button.data';
import { useMigrateCoin } from './migrate-coin-button.hook';

const MigrateCoinButton: FC = () => {
  const migrateCoin = useMigrateCoin();
  const getExplorerLink = useGetExplorerUrl();
  const { dialog, handleClose } = useDialog();
  const [loading, setLoading] = useState(false);
  const { control, setValue, trigger } = useFormContext<IMigrateCoin>();
  const network = useNetwork();

  const step = useWatch({ control, name: 'step' });

  const goToTx = (tx: string) =>
    window.open(
      getExplorerLink(tx, ExplorerMode.Transaction),
      '_blank',
      'noreferrer'
    );

  const handleMigrateCoin = async () => {
    try {
      setLoading(true);

      await dialog.promise(migrateCoin(), {
        success: (txDigest: unknown) => ({
          title: 'Coin Migrated',
          button: {
            label: 'See on explorer',
            onClick: () => goToTx(String(txDigest)),
          },
          message:
            'Congratulations! Your coin was successfully migrated. Now you can power your coin around the community',
          ghostButton: {
            label: 'Continue browsing',
            onClick: handleClose,
          },
          Icon: (
            <Img
              alt="Success"
              width="7rem"
              height="7rem"
              src="/dialogs/success.png"
            />
          ),
        }),
        loading: () => ({
          Icon: <LoaderSVG />,
          title: 'Migrating...',
          message:
            'Accept the transaction on the your wallet pop up, we will let you know when it is done.',
        }),
        error: (e) => ({
          title: 'Oops! You could not migrate!',
          button: { label: 'Try again', onClick: handleMigrateCoin },
          message: (
            e.message ||
            'Try to refresh the page, double-check your inputs, or reconnect your wallet.'
          ).replace('Invariant failed: ', ''),
          ghostButton: {
            label: 'Do not want to try again!',
            onClick: handleClose,
          },
          Icon: (
            <Img
              alt="Error"
              width="7rem"
              height="7rem"
              src="/dialogs/error.png"
            />
          ),
        }),
      });
    } finally {
      setLoading(false);
    }
  };

  if (step === Step.Preview)
    return (
      <WalletGuardedButton onClick={handleMigrateCoin}>
        {loading
          ? 'Migrating Coin...'
          : `Migrate Coin for ${MIGRATE_COIN_FEE_MAP[network]} SUI`}
      </WalletGuardedButton>
    );

  const handleNext = async () => {
    if ([Step.Features, Step.Select].includes(step)) {
      const isValid = await trigger(STEP_VALIDATION[step]);

      if (!isValid) return;
    }

    setValue('step', NEXT_STEP[step]);
  };

  return (
    <Button
      all="unset"
      p="1.125rem"
      gap="0.5rem"
      bg="#F5B722"
      display="flex"
      color="#000000"
      cursor="pointer"
      alignItems="center"
      whiteSpace="nowrap"
      onClick={handleNext}
      borderRadius="0.75rem"
      justifyContent="center"
    >
      {NEXT_BUTTON_TEXT[step]}
    </Button>
  );
};

export default MigrateCoinButton;
