import { ApolloProvider, ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import './global.scss'

export default function App({ Component, pageProps }) {
  const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={apolloClient}>
      <Component { ...pageProps } />
    </ApolloProvider>
  );
}
