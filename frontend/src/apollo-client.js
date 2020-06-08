//import ApolloClient from 'apollo-boost';

import { onError } from 'apollo-link-error'
import { ApolloLink, Observable } from 'apollo-link';
import { InMemoryCache } from "apollo-cache-inmemory";

import {getJWT} from "./utils/auth"
import { ApolloClient } from 'apollo-client';
//import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
//import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
//import { ApolloLink, Observable } from 'apollo-link';



import {GRAPQHL_ENDPOINT} from "./settings"
import {createUploadLink} from "apollo-upload-client"
// create cach
const cache = new InMemoryCache({});


/*const client = new ApolloClient({
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
    link: ApolloLink.from([ uploadLink ]),
    cache,
  });*/



const request = async (operation) => {
  const token = getJWT();
  operation.setContext({
    headers: {
      authorization: token ? `JWT ${token}` : ''
    }
  });
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => console.log(`GraphQL Error: ${message}`));
  }
  if (networkError) {
    console.log(`Network Error: ${networkError.message}`);
  }

  if (graphQLErrors || networkError) {
    
  }
})

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle;
    Promise.resolve(operation)
      .then(oper => request(oper))
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) handle.unsubscribe();
    };
  })
);

const uploadLink = createUploadLink({ uri: GRAPQHL_ENDPOINT });


  const client = new ApolloClient({
    link: ApolloLink.from([
      errorLink,
      requestLink,
      uploadLink,    
    ]),
    cache
  });


export default client