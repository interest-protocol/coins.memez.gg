import { Div, Main } from '@stylin.js/elements';
import { FC, PropsWithChildren } from 'react';

import Footer from './footer';
import Header from './header';

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <Div display="flex" flexDirection="column">
    <Header />
    <Main flex="1">{children}</Main>
    <Footer />
  </Div>
);

export default Layout;
