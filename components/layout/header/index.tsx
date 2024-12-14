import { Div, Header as HtmlHeader, Img } from '@stylin.js/elements';
import { FC } from 'react';

import WalletButton from './wallet-button';

const Header: FC = () => (
  <HtmlHeader p="1rem" bg="#00000033" backdropFilter="blur(40px)">
    <Div
      mx="auto"
      display="flex"
      maxWidth="87.5rem"
      alignItems="center"
      justifyContent="space-between"
    >
      <Img src="/logo.png" alt="logo" />
      <WalletButton />
    </Div>
  </HtmlHeader>
);

export default Header;
