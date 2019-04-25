import { prismaObjectType } from 'nexus-prisma'

export const User = prismaObjectType({
  name: 'User',
  definition(t) {
    t.prismaFields([
      'id',
      'name',
      'email',
      'isPro',
      'pushToken',
      {
        name: 'posts',
        args: [], // remove the arguments from the `posts` field of the `User` type in the Prisma schema
      },
      {
        name: 'habits'
      },
      {
        name: 'moods'
      }
    ])
  },
})
