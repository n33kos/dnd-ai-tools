import {ApolloProvider, ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import App from '../src/components/App/App';

export default function Index() {
  const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  );
}
