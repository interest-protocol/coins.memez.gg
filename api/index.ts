import { ApolloClient, InMemoryCache } from '@apollo/client';

export const graphQLClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
});
