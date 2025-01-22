import { Div, Main } from '@stylin.js/elements';
import { FC, PropsWithChildren } from 'react';

import ModalProvider from '../modal-provider';
import Footer from './footer';
import Header from './header';

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <Div
    height="100vh"
    display="flex"
    flexDirection="column"
    pb="env(safe-area-inset-bottom)"
  >
    <ModalProvider />
    <Header />
    <Main flex="1">
      {children}
      <Footer />
    </Main>
  </Div>
);

export default Layout;
