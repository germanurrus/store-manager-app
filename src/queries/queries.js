import { gql } from '@apollo/client';

const GET_AUTHORS_QUERIES = gql`
  {
      authors {
          name
          id
      }
  }
`

const GET_BOOK_QUERIES = gql`
  {
      books {
          name
          id
      }
  }
`

const ADD_BOOK_MUTATION = gql`
  mutation($name: String!,$genre: String!, $authorId: ID!){
      addBook(name: $name, genre: $genre, authorId: $authorId){
          name
          id
      }
  }
`

const GET_BOOK_QUERY = gql`
    query($id: ID){
        book(id: $id){
            id
            name
            genre
            author {
                 id
                 name
                 age
                 books{
                   id
                   name         
                 }
             }
        }
    }
`

export { GET_AUTHORS_QUERIES, GET_BOOK_QUERIES, ADD_BOOK_MUTATION, GET_BOOK_QUERY};