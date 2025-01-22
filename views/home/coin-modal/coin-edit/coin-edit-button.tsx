import { Img } from '@stylin.js/elements';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { LoaderSVG } from '@/components/svg';
import WalletGuardedButton from '@/components/wallet-guarded-button';
import { ExplorerMode } from '@/constants';
import { useDialog } from '@/hooks/use-dialog';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';

import { useEdit } from './coin-edit.hook';
import { CoinEditFormProps, IEditForm } from './coin-edit.types';

const CoinEditButton: FC<CoinEditFormProps> = ({ coin, editable }) => {
  const edit = useEdit(coin);
  const getExplorerLink = useGetExplorerUrl();
  const { dialog, handleClose } = useDialog();
  const [loading, setLoading] = useState(false);
  const { trigger, control } = useFormContext<IEditForm>();

  const [name, symbol, description, image] = useWatch({
    control,
    name: ['name', 'symbol', 'description', 'imageUrl'],
  });

  const goToTx = (tx: string) =>
    window.open(
      getExplorerLink(tx, ExplorerMode.Transaction),
      '_blank',
      'noreferrer'
    );

  const disabled =
    !editable ||
    (coin.name === name &&
      coin.symbol === symbol &&
      coin.description === description &&
      coin.iconUrl === image);

  const handleEdit = async () => {
    const isValid = await trigger();

    if (!isValid || disabled) return;

    try {
      setLoading(true);

      await dialog.promise(edit(), {
        success: (txDigest) => ({
          title: 'Coin Updated',
          button: {
            label: 'See on explorer',
            onClick: () => goToTx(String(txDigest)),
          },
          message: 'Congratulations! Your coin was successfully updated.',
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
          title: 'Updating...',
          message:
            'Accept the transaction on the your wallet pop up, we will let you know when it is done.',
        }),
        error: (e) => ({
          title: 'Oops! You could not create!',
          button: { label: 'Try again', onClick: handleEdit },
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

  return (
    <WalletGuardedButton onClick={handleEdit} disabled={disabled}>
      {loading ? 'Updating...' : !editable ? 'Unable to update' : 'Update'}
    </WalletGuardedButton>
  );
};

export default CoinEditButton;
