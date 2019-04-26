import { getUserId } from '../utils'
import { stringArg, idArg, queryType } from 'nexus'

import { prismaObjectType } from 'nexus-prisma'


export const Query = prismaObjectType({
  name: 'Query',
  definition(t) {
    t.prismaFields(['moods', 'habits'])
    t.modify("moods", {
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx);
        return ctx.prisma.moods({
          where:{owner:{id: userId}}
        })
      }
    })
    t.modify('habits', {
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx);
        return ctx.prisma.habits({
          where: {owner:{id: userId}}
        })
      }
    })
    t.field('me', {
      type: 'User',
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx)
        return ctx.prisma.user({ id: userId })
      },
    })
  },
})
