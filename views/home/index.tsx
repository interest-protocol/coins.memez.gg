import { Button, Div, H2, Section } from '@stylin.js/elements';
import { FC } from 'react';

import { Layout } from '@/components';
import { CirclePlusSVG } from '@/components/svg';

import CardList from './coin-card-list';

const Home: FC = () => (
  <Layout>
    <Section
      px="2rem"
      mx="auto"
      py="2rem"
      gap="2rem"
      display="flex"
      maxWidth="96rem"
      flexDirection="column"
    >
      <Div py="1.5rem" px="4rem" bg="#3C3C3C80" borderRadius="1rem">
        <Div
          mx="auto"
          display="flex"
          maxWidth="82rem"
          alignItems="center"
          justifyContent="space-between"
        >
          <H2>Memez Coins</H2>
          <Button
            all="unset"
            px="1.25rem"
            gap="0.5rem"
            bg="#F5B722"
            py="0.825rem"
            display="flex"
            color="#000000"
            cursor="pointer"
            alignItems="center"
            whiteSpace="nowrap"
            borderRadius="1rem"
          >
            Create coin
            <CirclePlusSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
          </Button>
        </Div>
      </Div>
      <Div p="1.5rem" bg="#3C3C3C80" borderRadius="1rem">
        <CardList />
      </Div>
    </Section>
  </Layout>
);

export default Home;
