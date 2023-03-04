import { gql } from '@apollo/client';

export const GET_MOVIES_QUERY = gql`
  query GetMovies {
    movies {
      name
    }
  }
`