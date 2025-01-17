import { Button } from '@stylin.js/elements';
import { FC } from 'react';

import { CirclePlusSVG } from '@/components/svg';
import { useModal } from '@/hooks/use-modal';

import NewCoinModal from './new-coin-modal';

const NewCoin: FC = () => {
  const { setContent } = useModal();

  const handleOpenModal = () =>
    setContent(<NewCoinModal />, {
      overlayProps: {
        alignItems: ['flex-end', 'center'],
      },
      containerProps: {
        display: 'flex',
        maxHeight: '90vh',
        maxWidth: ['100vw', '95vw'],
      },
    });

  return (
    <Button
      all="unset"
      px="1.25rem"
      gap="0.5rem"
      bg="#F5B722"
      display="flex"
      color="#000000"
      cursor="pointer"
      alignItems="center"
      whiteSpace="nowrap"
      borderRadius="1rem"
      justifyContent="center"
      onClick={handleOpenModal}
      py={['1rem', '1rem', '1rem', '0.825rem']}
    >
      New coin
      <CirclePlusSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
    </Button>
  );
};

export default NewCoin;
