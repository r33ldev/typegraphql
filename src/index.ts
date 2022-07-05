import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import 'reflect-metadata';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';

import {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { resolvers } from './users/resolvers';
import { connectToMongo } from './utils/mongo';
import { Context } from './types/context';
import { verifyJWT } from './utils/jwt';
import { User } from './users/schema/user.schema';
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
    context: (ctx: Context) => {
      const context = ctx;
      if (ctx.req.cookies.token) {
        const user = verifyJWT<User>(
          ctx.req.cookies.token,
          Buffer.from(process.env.PUBLIC_KEY as string, 'base64').toString(
            'ascii'
          )
        );
        if (user) context.user = user;
      }
      return context;
    },
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
