import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import {apolloServer} from './apolloServer.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(apolloServer));

app.listen(port, () => {
    console.log(`listening on ${port}`);
});