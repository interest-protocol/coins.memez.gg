import 'react-loading-skeleton/dist/skeleton.css';

import { ApolloProvider } from '@apollo/client';
import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';

import { graphQLClient } from '@/api';
import ModalProvider from '@/components/modal-provider';
import { GlobalStyles } from '@/styles';

const Web3Provider = dynamic(import('@/components/web3-provider'), {
  ssr: false,
});

const App = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={graphQLClient}>
    <Web3Provider>
      <Toaster />
      <Global styles={GlobalStyles} />
      <Component {...pageProps} />
      <ModalProvider />
    </Web3Provider>
  </ApolloProvider>
);

export default App;
