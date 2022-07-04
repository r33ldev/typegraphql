import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import 'reflect-metadata';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import config from 'config'
import {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { resolvers } from './users/resolvers';
import { connectToMongo } from './utils/mongo';
dotenv.config();

const bootstrap = async () => {
  //build schema
  const schema = await buildSchema({
    resolvers,
    // authCheck
  });
  // init express
  const app = express();

  app.use(cookieParser());

  // create apollo server
  const server = new ApolloServer({
    schema,
    context: (ctx) => ctx,
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: 5000 }, () => {
    console.log('app started on http://localhost:5000');
  });
  connectToMongo();
};

bootstrap();


