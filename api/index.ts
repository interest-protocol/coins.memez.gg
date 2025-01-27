import { ApolloClient, InMemoryCache } from '@apollo/client';

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URI || '';

export const graphQLClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: GRAPHQL_URL,
});
