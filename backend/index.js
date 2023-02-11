import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { getAllMovies } from './db.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

const typeDefs = `#graphql
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
        movies: async () => await getAllMovies(),
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});

await apolloServer.start();

app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(apolloServer));

app.listen(port, () => {
    console.log(`listening on ${port}`);
});