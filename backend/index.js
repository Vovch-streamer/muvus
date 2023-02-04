import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import './db.js';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello World!'));

const typeDefs = `#graphql
    type Book {
        title: String
        author: String
    }
    type Query {
        books: [Book]
    }
`;

const books = [
    {
        title: 'The Awakening123123213',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const resolvers = {
    Query: {
        books: () => books,
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