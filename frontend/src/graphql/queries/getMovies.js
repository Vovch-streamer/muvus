import { gql } from '@apollo/client';

export default gql`
  query GetMovies {
    movies {
      name
    }
  }
`