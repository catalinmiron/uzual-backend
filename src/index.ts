import * as path from 'path';
import { config } from 'dotenv';
const isProd = process.env.NODE_ENV === 'production';
const p = isProd ? '../.env.production' : '../.env';
config({ path: path.resolve(__dirname, p) });
console.log(process.env.NODE_ENV);

import { GraphQLServer } from 'graphql-yoga';
import { prisma } from './generated/prisma-client';
import { makePrismaSchema } from 'nexus-prisma';
import { permissions } from './permissions';
import * as allTypes from './resolvers';
import datamodelInfo from './generated/nexus-prisma';

const schema = makePrismaSchema({
  // Provide all the GraphQL types we've implemented
  types: allTypes,

  // Configure the interface to Prisma
  prisma: {
    datamodelInfo,
    client: prisma
  },

  // Specify where Nexus should put the generated files
  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus')
  },

  // Configure nullability of input arguments: All arguments are non-nullable by default
  nonNullDefaults: {
    input: false,
    output: false
  },

  // Configure automatic type resolution for the TS representations of the associated types
  typegenAutoConfig: {
    sources: [
      {
        source: path.join(__dirname, './types.ts'),
        alias: 'types'
      }
    ],
    contextType: 'types.Context'
  }
});

const server = new GraphQLServer({
  schema,
  middlewares: [permissions],
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});

server.start(
  {
    port: process.env.PORT || 4000
  },
  ({ port }) => console.log(`Server is running on http://localhost:${port}`)
);
