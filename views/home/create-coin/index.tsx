import { Button } from '@stylin.js/elements';
import { FC } from 'react';

import { CirclePlusSVG } from '@/components/svg';
import { useModal } from '@/hooks/use-modal';

import CreateCoinModal from './create-coin-modal';

const CreateCoin: FC = () => {
  const { setContent } = useModal();

  const handleOpenModal = () =>
    setContent(<CreateCoinModal />, {
      allowClose: true,
      containerProps: { display: 'flex', maxHeight: '90vh' },
    });

  return (
    <Button
      all="unset"
      px="1.25rem"
      gap="0.5rem"
      bg="#F5B722"
      py="0.825rem"
      display="flex"
      color="#000000"
      cursor="pointer"
      alignItems="center"
      whiteSpace="nowrap"
      borderRadius="1rem"
      onClick={handleOpenModal}
    >
      Create coin
      <CirclePlusSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
    </Button>
  );
};

export default CreateCoin;
