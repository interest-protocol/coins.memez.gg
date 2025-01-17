import { Button, Img } from '@stylin.js/elements';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { LoaderSVG } from '@/components/svg';
import WalletGuardedButton from '@/components/wallet-guarded-button';
import { ExplorerMode } from '@/constants';
import { CREATE_COIN_FEE } from '@/constants/fee';
import { useDialog } from '@/hooks/use-dialog';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';

import { NEXT_BUTTON_TEXT, NEXT_STEP } from '../create-coin.data';
import { ICreateCoin, Step } from '../create-coin.types';
import { STEP_VALIDATION } from './create-coin-button.data';
import { useCreateCoin } from './create-coin-button.hook';

const CreateCoinButton: FC = () => {
  const createCoin = useCreateCoin();
  const getExplorerLink = useGetExplorerUrl();
  const { dialog, handleClose } = useDialog();
  const [loading, setLoading] = useState(false);
  const { control, setValue, trigger } = useFormContext<ICreateCoin>();

  const step = useWatch({ control, name: 'step' });

  const goToTx = (tx: string) =>
    window.open(
      getExplorerLink(tx, ExplorerMode.Transaction),
      '_blank',
      'noreferrer'
    );

  const handleCreateCoin = async () => {
    try {
      setLoading(true);

      await dialog.promise(createCoin(), {
        success: (txDigest: unknown) => ({
          timeout: 15000,
          title: 'Coin Created',
          button: {
            label: 'See on explorer',
            onClick: () => goToTx(String(txDigest)),
          },
          message:
            'Congratulations! Your coin was successfully created. Now you can power your coin around the community',
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
          title: 'Creating...',
          message:
            'Accept the transaction on the your wallet pop up, we will let you know when it is done.',
        }),
        error: (e) => ({
          title: 'Oops! You could not create!',
          button: { label: 'Try again', onClick: handleCreateCoin },
          message:
            e.message ||
            'Try to refresh the page, double-check your inputs, or reconnect your wallet.',
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
      <WalletGuardedButton onClick={handleCreateCoin}>
        {loading
          ? 'Creating Coin...'
          : `Create Coin for ${CREATE_COIN_FEE} SUI`}
      </WalletGuardedButton>
    );

  const handleNext = async () => {
    if (
      Step.Details === step ||
      Step.Supply === step ||
      Step.Features === step
    ) {
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

export default CreateCoinButton;
