import { Div, Section } from '@stylin.js/elements';
import { FC } from 'react';

import { Layout } from '@/components';

import CardList from './coin-card-list';
import CreateCoin from './new-coin';

const Home: FC = () => (
  <Layout>
    <Div
      px="2rem"
      width="100%"
      flexDirection="column"
      display={['flex', 'flex', 'flex', 'none']}
    >
      <CreateCoin />
    </Div>
    <Section
      mx="auto"
      gap="2rem"
      display="flex"
      maxWidth="96rem"
      flexDirection="column"
      p={['1.5rem', '1.5rem', '1.5rem', '2rem']}
    >
      <Div bg="#3C3C3C80" borderRadius="1rem" p={['1rem', '1.5rem']}>
        <CardList />
      </Div>
    </Section>
  </Layout>
);

export default Home;
