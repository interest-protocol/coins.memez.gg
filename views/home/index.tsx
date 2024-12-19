import { Div, Section } from '@stylin.js/elements';
import { FC } from 'react';

import { Layout } from '@/components';

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
      <Div p="1.5rem" bg="#3C3C3C80" borderRadius="1rem">
        <CardList />
      </Div>
    </Section>
  </Layout>
);

export default Home;
