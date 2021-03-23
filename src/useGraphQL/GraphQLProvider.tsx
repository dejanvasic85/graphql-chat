import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  from,
  split,
  InMemoryCache
} from "@apollo/client";
import { createHttpLink } from "@apollo/client/link/http";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

import { token } from "../data";

const httpLink = createHttpLink({
  uri: "https://www.ufin.com.au/api/graphql"
});

const wsLink = new WebSocketLink({
  uri: "wss://www.ufin.com.au/api/subscriptions",
  options: {
    reconnect: true,
    connectionParams: {
      authToken: token
    }
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    Authorization: `Bearer ${token}`
  }
}));

const createClient = () => {
  const link = from([authLink, splitLink]);
  return new ApolloClient({ link, cache: new InMemoryCache() });
};

export default function GraphQLProvider({ children }) {
  const client = createClient();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
