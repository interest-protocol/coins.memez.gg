import { Button, Div, Img, Span } from '@stylin.js/elements';
import React, { FC } from 'react';

import { COLOR_MAP, STATUS_ICON } from './dialog.data';
import { DialogProps, IDialogButton } from './dialog.types';
import { hexToRgb } from './dialog.utils';

export const Dialog: FC<DialogProps> = ({
  title,
  status,
  message,
  primaryButton,
  secondaryButton,
}) => {
  const Icon = STATUS_ICON[status] ?? STATUS_ICON['info'];

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
        gap="1rem"
        pt="1.5rem"
        display="flex"
        minWidth="100%"
        maxWidth="22rem"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        {status !== 'general' ? (
          status === 'loading' ? (
            <Div
              ml="0.75rem"
              display="flex"
              minWidth="1.5rem"
              minHeight="1.5rem"
              alignItems="center"
              justifyContent="center"
            >
              <Img src="/logo.png" alt="logo" width="4rem" />
            </Div>
          ) : (
            <Div
              width="3rem"
              height="3rem"
              display="flex"
              borderRadius="50%"
              alignItems="center"
              justifyContent="center"
              color={COLOR_MAP[status]}
              backgroundColor={`rgba(${hexToRgb(COLOR_MAP[status])}, 0.3)`}
            >
              <Icon
                maxWidth="1.3rem"
                maxHeight="1.3rem"
                width="100%"
                height="100%"
              />
            </Div>
          )
        ) : null}
      </Div>
      {message && (
        <Div
          gap="m"
          py="1rem"
          display="flex"
          minWidth="100%"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <Span>{message}</Span>
        </Div>
      )}
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
                  color={COLOR_MAP.error ? '#fffff' : '#000000'}
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
