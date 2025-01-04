import { Typography } from '@interest-protocol/ui-kit';
import { Div, Img } from '@stylin.js/elements';
import { FC, PropsWithChildren } from 'react';

const SuccessModal: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Div width="100%">
      <Div
        gap="m"
        mb="2rem"
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Div display="flex" flexDirection="column">
          {children}
        </Div>
      </Div>
      <Div display="flex" justifyContent="center" mb="0.5rem">
        <Typography
          alignItems="center"
          textAlign="center"
          color="onSurface"
          variant="headline"
          size="small"
          display="flex"
          fontSize="1rem"
          lineHeight="1rem"
        >
          BY:
        </Typography>
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
      </Div>
      <a href="https://www.memez.gg" target="_blank" rel="noopener, noreferrer">
        <Typography
          alignItems="center"
          textAlign="center"
          variant="body"
          size="small"
          display="flex"
          lineHeight="1.5rem"
          fontSize="0.75rem"
          width="fit-content"
          mx="auto"
          color="primary"
          mt="0.5rem"
        >
          www.memez.gg
        </Typography>
      </a>
    </Div>
  );
};

export default SuccessModal;
