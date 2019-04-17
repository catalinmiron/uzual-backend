import { GraphQLServer } from 'graphql-yoga'
import { prisma } from './generated/prisma-client'
import resolvers from './resolvers'

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: (resolvers as any),
  context: request => ({
    ...request,
    prisma,
  }),
})


server.start(
  {
    port: process.env.PORT || 8080
  },
  ({ port }) =>
    console.log(
      `Server is running on http://localhost:${port}`
    )
);