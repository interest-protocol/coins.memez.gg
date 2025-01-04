import { Button, Div, P } from '@stylin.js/elements';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { SadMemezGGSVG } from '@/components/svg';
import { Routes, RoutesEnum } from '@/constants';

import { ErrorProps } from './error.types';

const Error: FC<ErrorProps> = ({ message }) => {
  const { push } = useRouter();

  return (
    <Div
      gap="0.5rem"
      width="100%"
      height="100vh"
      display="flex"
      color="onSurface"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Div width="12rem" height="12rem">
        <SadMemezGGSVG maxHeight="12rem" maxWidth="12rem" width="100%" />
      </Div>
      <P fontSize="3.563rem" textAlign="center">
        OOPS!
      </P>
      <P mb="1rem" textAlign="center">
        {message || 'Something went wrong'}
      </P>
      <Button
        mx="auto"
        px="1.5rem"
        py="0.75rem"
        bg="#F5B722"
        border="none"
        cursor="pointer"
        borderRadius="1rem"
        fontSize="0.875rem"
        nHover={{ opacity: '0.8' }}
        onClick={() => push(Routes[RoutesEnum.Home])}
      >
        Back home!
      </Button>
    </Div>
  );
};

export default Error;
