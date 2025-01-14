import { Div } from '@stylin.js/elements';
import { AnimatePresence, motion } from 'motion/react';
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

const Motion = motion.create(Div);

const content = [
  <CoinDetails key={unikey()} />,
  <CoinBurn key={unikey()} />,
  <CoinMint key={unikey()} />,
  <CoinEdit key={unikey()} />,
].map((item) => (
  <Motion
    width="100%"
    key={unikey()}
    exit={{ opacity: 0 }}
    animate={{ opacity: [0, 1] }}
    transition={{ duration: 0.5 }}
  >
    {item}
  </Motion>
));

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
    <Motion
      layout
      py="1rem"
      px="0.5rem"
      bg="#3C3C3C80"
      display="flex"
      maxHeight="90vh"
      flexDirection="column"
      backdropFilter="blur(19px)"
      width={['100vw', '95vw', '43.75rem']}
      borderRadius={['1.125rem 1.125rem  0 0', '1.125rem']}
    >
      <Div px="0.5rem">
        <Tabs
          selected={tab}
          onSelect={onSelect}
          items={['details', 'burn', 'mint', 'edit']}
        />
      </Div>
      <AnimatePresence>
        <Div
          mt="1.5rem"
          px="0.5rem"
          height="100%"
          display="flex"
          overflowY="auto"
        >
          {content[tab]}
        </Div>
      </AnimatePresence>
    </Motion>
  );
};

export default CoinModal;
