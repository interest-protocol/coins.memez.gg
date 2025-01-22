import { Button, Div, H2, Img, P, Span } from '@stylin.js/elements';
import { FC } from 'react';

import { CautionSVG } from '@/components/svg';
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
        Caution
      </H2>
      <Div textAlign="center">
        <Img alt="Error" width="7rem" height="7rem" src="/dialogs/error.png" />
      </Div>
      <Div
        px="1rem"
        gap="1rem"
        py="0.63rem"
        display="flex"
        alignItems="center"
        borderRadius="0.625rem"
        border="1px solid #E03137"
      >
        <Span color="#E03137">
          <CautionSVG width="100%" maxWidth="5rem" maxHeight="5rem" />
        </Span>
        <P wordBreak="break-word" color="#FFFFFF99">
          You are about to remove a feature from this coin. This action is
          irreversible. Ensure you are removing the right feature.
        </P>
      </Div>
      <Div
        px="1rem"
        py="0.5rem"
        bg="#FF47471A"
        color="#E03137"
        border="1px solid"
        textAlign="center"
        alignItems="center"
        borderRadius="0.625rem"
      >
        Alert! You are destroying a feature.
      </Div>
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
