import { Div } from '@stylin.js/elements';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import unikey from 'unikey';

import Tabs from '@/components/tabs';
import useURIStaticParams from '@/hooks/use-uri-static-params';
import { updateURL } from '@/utils/url';

import CoinBurn from './coin-burn';
import CoinDetails from './coin-details';
import CoinEdit from './coin-edit';
import CoinMint from './coin-mint';

const content = [
  <CoinDetails key={unikey()} />,
  <CoinBurn key={unikey()} />,
  <CoinMint key={unikey()} />,
  <CoinEdit key={unikey()} />,
];

const CoinModal: FC = () => {
  const { pathname } = useRouter();
  const [tab, setTab] = useState(0);
  const params = useURIStaticParams();

  useEffect(() => {
    if (!params) return;

    setTab(Number(params.get('mode'))); // Initialize based on URL
  }, [params]); // Params will only update once after first render

  const onSelect = (index: number) => {
    if (!params) return;

    setTab(index);
    params?.set('mode', String(index));
    updateURL(`${pathname}?${params?.toString()}`);
  };

  return (
    <Div
      py="1rem"
      px="0.5rem"
      bg="#3C3C3C80"
      display="flex"
      width="43.75rem"
      maxHeight="90vh"
      flexDirection="column"
      borderRadius="1.125rem"
      backdropFilter="blur(19px)"
    >
      <Div px="0.5rem">
        <Tabs
          selected={tab}
          onSelect={onSelect}
          items={['details', 'burn', 'mint', 'edit']}
        />
      </Div>
      <Div overflowY="auto" height="100%" mt="1.5rem" px="0.5rem">
        {content[tab]}
      </Div>
    </Div>
  );
};

export default CoinModal;
