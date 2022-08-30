import { Request, Response, Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { buildSchema } from 'type-graphql';
import 'reflect-metadata';
require("module-alias/register");
require('dotenv/config');
import http from 'http';
import cors from 'cors';
const express = require('express');
const MongoStore = require('connect-mongo');
const session = require('express-session');
import { Session, SessionData } from 'express-session';
import { WHITE_LIST, COOKIE_NAME, __prod__ } from './utils/constants';
import { UserResolver } from './resolvers/User.resolver';


const app: Express = express();
app.use(
  cors({
    origin: WHITE_LIST,
    credentials: true,
  })
);
const httpServer = http.createServer(app);

const PORT = 4000;
// setup session with mongodb
app.use(session({
  name: COOKIE_NAME,
  store: MongoStore.create( {
    mongoUrl: process.env['dbURI'],
  } ),
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour
    httpOnly: true,
    secure: __prod__, // cookie only works in https
  },
  secret: process.env['SESSION_SECRET'],
  saveUninitialized: false, // don't save empty session, right from the start
  resave: false, // not resave data to store on each request
}));

// setup graphql with apollo
(async () => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql', cors: false });
})();

type requestMe = Request & { session: Session & Partial<SessionData> & {userid?: String}};
app.get('/', (req: requestMe , res: Response) => {
  req.session.userid = 'test';
  res.send('Hello world');
});
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

