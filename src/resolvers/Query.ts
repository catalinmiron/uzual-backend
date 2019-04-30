import { getUserId } from '../utils'
import { stringArg, idArg, queryType, intArg } from 'nexus'

import { prismaObjectType } from 'nexus-prisma'


export const Query = prismaObjectType({
  name: 'Query',
  definition(t) {
    t.prismaFields(['moods', 'habits'])
    t.field("moods", {
      type: 'Mood',
      list: true,
      args: {
        ...t.prismaType.moods.args
      },
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx);
        const where = {...args.where, owner:{id: userId}}
        return ctx.prisma.moods({
          ...args,
          where
        })
      }
    })
    t.field('habits', {
      type: 'Habit',
      list: true,
      args: {
        ...t.prismaType.habits.args
      },
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx);
        const where = {...args.where, owner:{id: userId}}
        return ctx.prisma.habits({
          ...args,
          where
        });
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
