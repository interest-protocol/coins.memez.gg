import { FC, useState } from 'react';

import WalletGuardedButton from '@/components/wallet-guarded-button';

import { useEdit } from './coin-edit.hook';
import { CoinEditFormProps } from './coin-edit.types';

const CoinEditButton: FC<CoinEditFormProps> = ({ coin, editable }) => {
  const edit = useEdit(coin);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    if (!editable) return;

    try {
      setLoading(true);
      await edit();
      setError('');
    } catch (e) {
      console.warn({ e });

      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WalletGuardedButton onClick={handleEdit} disabled={!editable}>
      {loading
        ? 'Updating...'
        : error || editable
          ? 'Unable to edit'
          : 'Update'}
    </WalletGuardedButton>
  );
};

export default CoinEditButton;
