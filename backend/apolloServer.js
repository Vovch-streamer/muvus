import { ApolloServer } from "@apollo/server";
import { moviesResolver } from "./Movies/movies.resolvers.js";

export const typeDefs = `#graphql
    type Movie {
        name: String,
        createdAt: String,
        updatedAt: String,
        id: Int,
    }
    type Query {
        movies: [Movie]
    }
`;

const resolvers = {
  Query: {
    movies: moviesResolver,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

await apolloServer.start();
