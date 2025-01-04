import { Button, Div, Span } from '@stylin.js/elements';
import React, { FC } from 'react';

import { COLOR_MAP } from './dialog.data';
import { DialogProps, IDialogButton } from './dialog.types';

export const Dialog: FC<DialogProps> = ({
  title,
  status,
  message,
  primaryButton,
  secondaryButton,
}) => {
  return (
    <Div
      p="1.5rem"
      width="25rem"
      bg="#080e18"
      maxWidth="100%"
      border="1px solid"
      alignItems="center"
      display="inline-flex"
      borderRadius="0.5rem"
      flexDirection="column"
      justifyContent="center"
      borderColor="#F5B722"
    >
      <Div
        display="flex"
        minWidth="100%"
        position="relative"
        alignItems="center"
        justifyContent="center"
      >
        <Span flex="1" textAlign="center" fontSize="1rem">
          {title}
        </Span>
      </Div>
      <Div
        gap="m"
        py="1rem"
        display="flex"
        minWidth="100%"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        {message && <Span>{message}</Span>}
      </Div>
      <Div
        pt="1rem"
        display="flex"
        minWidth="100%"
        justifyContent="space-between"
        flexDirection="row"
        gap="0.5rem"
      >
        {!!secondaryButton &&
          (React.isValidElement(secondaryButton)
            ? secondaryButton
            : !!(secondaryButton as IDialogButton)?.label && (
                <Button
                  all="unset"
                  flex="1"
                  p="0.6rem"
                  gap="0.5rem"
                  bg="#393838"
                  display="flex"
                  color="#fff"
                  cursor="pointer"
                  alignItems="center"
                  whiteSpace="nowrap"
                  borderRadius="0.5rem"
                  justifyContent="center"
                  onClick={(secondaryButton as IDialogButton)?.onClick}
                >
                  {(secondaryButton as IDialogButton)?.label}
                </Button>
              ))}
        {!!primaryButton &&
          (React.isValidElement(primaryButton)
            ? primaryButton
            : !!(primaryButton as IDialogButton)?.label && (
                <Button
                  all="unset"
                  flex="3"
                  p="0.6rem"
                  gap="0.5rem"
                  display="flex"
                  cursor="pointer"
                  color="#000000"
                  alignItems="center"
                  whiteSpace="nowrap"
                  borderRadius="0.5rem"
                  justifyContent="center"
                  onClick={(primaryButton as IDialogButton)?.onClick}
                  bg={status === 'error' ? COLOR_MAP.error : COLOR_MAP.info}
                >
                  {(primaryButton as IDialogButton)?.label || 'Got it'}
                </Button>
              ))}
      </Div>
    </Div>
  );
};
