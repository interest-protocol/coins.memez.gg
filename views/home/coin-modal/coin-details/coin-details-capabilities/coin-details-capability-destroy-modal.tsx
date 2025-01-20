import { Button, Div, H2, Img, P } from '@stylin.js/elements';
import { FC } from 'react';

import { useModal } from '@/hooks/use-modal';

import { CapabilityDestroyModalProps } from '../coin-details.types';

const CapabilityDestroyModal: FC<CapabilityDestroyModalProps> = ({
  onClick,
}) => {
  const { handleClose } = useModal();

  return (
    <Div
      p="1.5rem"
      gap="1.5rem"
      width="30rem"
      display="flex"
      bg="#3C3C3C80"
      maxWidth="100%"
      alignItems="stretch"
      fontFamily="DM Sans"
      borderRadius="1.15rem"
      flexDirection="column"
      justifyContent="center"
      backdropFilter="blur(19px)"
    >
      <H2
        fontWeight="700"
        textAlign="center"
        fontSize="1.75rem"
        justifyContent="center"
      >
        Destroy Feature
      </H2>
      <Div textAlign="center">
        <Img alt="Error" width="7rem" height="7rem" src="/dialogs/error.png" />
      </Div>

      <P textAlign="center" fontSize="1.125rem" wordBreak="break-word">
        Are you sure you want to destroy this feature? This action is
        irreversible and will permanently remove it from your setup. Proceed
        only if {"you're"} confident this is the right move.
      </P>
      <Div
        gap="1rem"
        display="flex"
        alignItems="stretch"
        flexDirection="column"
      >
        <Button
          all="unset"
          py="1rem"
          px="1.5rem"
          flex="2"
          bg="#F5B722"
          color="#000000"
          cursor="pointer"
          onClick={onClick}
          textAlign="center"
          borderRadius="1rem"
        >
          Confirm
        </Button>

        <Button
          all="unset"
          color="#F5B722"
          cursor="pointer"
          textAlign="center"
          fontSize="0.825rem"
          onClick={handleClose}
          nHover={{ textDecoration: 'underline' }}
        >
          Cancel
        </Button>
      </Div>
    </Div>
  );
};

export default CapabilityDestroyModal;
