import { Button, Div, H2, Img, P } from '@stylin.js/elements';
import { motion } from 'motion/react';
import { FC, useState } from 'react';

import { Radio } from '@/components';
import { useModal } from '@/hooks/use-modal';

import CreateCoinModal from './create-coin-modal';
import MigrateCoinModal from './migrate-coin-modal';
import { NewCoinMode } from './new-coin.types';

const Motion = motion.create(Div);

const NewCoinModal: FC = () => {
  const { setContent } = useModal();
  const [mode, setMode] = useState<NewCoinMode>();

  const handleOpenModal = (Component: FC | null) => () =>
    Component &&
    setContent(<Component />, {
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
    <Motion
      p="1rem"
      gap="1.5rem"
      bg="#3C3C3C80"
      display="flex"
      textAlign="center"
      flexDirection="column"
      width={['100vw', '28rem']}
      backdropFilter="blur(19px)"
      borderRadius={['1.125rem 1.125rem 0 0', '1.125rem']}
    >
      <Div display="flex" justifyContent="center">
        <Img src="/coins.png" width="5rem" height="5rem" alt="Coins" />
      </Div>
      <H2>Your Token Journey Starts Here!</H2>
      <P>
        Ready to build the future? Choose whether to create a brand-new token,
        or migrate your existing V1 token to V2.
      </P>
      <Div display="grid" gap="1rem" gridTemplateColumns="1fr 1fr">
        <Button
          all="unset"
          px="1rem"
          gap="0.5rem"
          py="1.125rem"
          display="flex"
          cursor="pointer"
          border="1px solid"
          alignItems="center"
          borderRadius="0.825rem"
          onClick={() => setMode(NewCoinMode.Create)}
          color={mode === NewCoinMode.Create ? '#F5B722' : undefined}
        >
          <Radio active={mode === NewCoinMode.Create} />
          Create a new coin
        </Button>
        <Button
          all="unset"
          px="1rem"
          gap="0.5rem"
          py="1.125rem"
          display="flex"
          cursor="pointer"
          border="1px solid"
          alignItems="center"
          borderRadius="0.825rem"
          onClick={() => setMode(NewCoinMode.Migrate)}
          color={mode === NewCoinMode.Migrate ? '#F5B722' : undefined}
        >
          <Radio active={mode === NewCoinMode.Migrate} />
          Migrate
        </Button>
      </Div>
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
        borderRadius="0.75rem"
        justifyContent="center"
        nDisabled={{ opacity: 0.3, cursor: 'not-allowed' }}
        disabled={
          ![NewCoinMode.Create, NewCoinMode.Migrate].includes(
            mode as NewCoinMode
          )
        }
        onClick={handleOpenModal(
          mode === NewCoinMode.Create
            ? CreateCoinModal
            : mode === NewCoinMode.Migrate
              ? MigrateCoinModal
              : null
        )}
      >
        Next
      </Button>
    </Motion>
  );
};

export default NewCoinModal;
