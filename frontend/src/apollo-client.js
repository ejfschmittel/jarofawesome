import ApolloClient from 'apollo-boost';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';
import { InMemoryCache } from "apollo-cache-inmemory";

import {getJWT} from "./utils/auth"


import {GRAPQHL_ENDPOINT} from "./settings"

// create cach
const cache = new InMemoryCache({});

/*const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    // User access token has expired
    if (graphQLErrors && graphQLErrors[0].message === 'Unauthorized') {
      // We assume we have both tokens needed to run the async request
      if (refreshToken && clientToken) {
        // Let's refresh token through async request
        return new Observable(observer => {
          authAPI.requestRefreshToken(refreshToken, clientToken)
            .then(refreshResponse => {
              operation.setContext(({ headers = {} }) => ({
                headers: {
                  // Re-add old headers
                  ...headers,
                  // Switch out old access token for new one
                  authorization: `Bearer ${refreshResponse.access_token}` || null,
                }
              }));
            })
            .then(() => {
              const subscriber = {
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer)
              };

              // Retry last failed request
              forward(operation).subscribe(subscriber);
            })
            .catch(error => {
              // No refresh or client token available, we force user to login
              observer.error(error);
            });
        });
      }
    }
  })*/


const client = new ApolloClient({
    uri: GRAPQHL_ENDPOINT,
    request: (operation) => {   
      const token = getJWT();
      operation.setContext({
        headers: {
          authorization: token ? `JWT ${token}` : ''
        }
      })
    } ,
    //onError: errorLink,
    cache,
  });


export default client