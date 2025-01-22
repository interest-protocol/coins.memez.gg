import { Div, Main } from '@stylin.js/elements';
import { FC, PropsWithChildren } from 'react';

import ModalProvider from '../modal-provider';
import Footer from './footer';
import Header from './header';

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <Div
    display="flex"
    minHeight="100vh"
    position="relative"
    flexDirection="column"
    pb="env(safe-area-inset-bottom)"
  >
    <Header />
    <Main flex="1">{children}</Main>
    <Footer />
    <ModalProvider />
  </Div>
);

export default Layout;
