import { GraphQLServer } from 'graphql-yoga'
import { prisma } from './generated/prisma-client'
import resolvers from './resolvers'

var jwt = require('jsonwebtoken')

jwt.sign(
  {
    data: {
      service: process.env.PRISMA_NAME + '@' + process.env.PRISMA_STAGE,
    },
  },
  process.env.PRISMA_SECRET,
  {
    expiresIn: '1h',
  }
)

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