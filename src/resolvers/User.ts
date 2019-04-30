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
        name: 'habits',
        args: ['first', 'orderBy']
      },
      {
        name: 'moods',
        args: ['first', 'orderBy']
      }
    ])
  },
})