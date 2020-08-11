import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import './App.css';
import { gql } from '@apollo/client';
// components
import BookList from './componets/BookList';
import AddBook from './componets/AddBook';

// Instantiate required constructor fields
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        book(_, { args, toReference }) {
          return toReference({
            __typename: 'Book',
            id: args.id,
          });
        }
      }
    }
  }
});

const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const client = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  link: link,

  // Provide some optional constructor fields
  name: 'react-web-client',
  version: '1.3',
  queryDeduplication: false,
});


function App() {

  client
  .query({
    query: gql`
      query {
        books {
          name
          id
          authorId
        }
      }
    `
  })
  .then(result => console.log('>>>>> ',result));
  return (
    <ApolloProvider client={client}>
      <div className="App" id="main">
        <h1> Ninja's Rading List </h1>
        < BookList />
        < AddBook/>
      </div>
    </ApolloProvider>
  );
}

export default App;
