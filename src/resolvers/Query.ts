import { getUserId, Context } from '../utils'
import { FragmentableArray } from '../generated/prisma-client';
import { QueryResolvers } from '../generated/graphqlgen';
import { Habit } from '../types';

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  // feed(parent, args, ctx: Context) {
  //   return ctx.prisma.posts({ where: { published: true } })
  // },
  // drafts(parent, args, ctx: Context) {
  //   const id = getUserId(ctx)

  //   const where = {
  //     published: false,
  //     author: {
  //       id,
  //     },
  //   }

  //   return ctx.prisma.posts({ where })
  // },

  // post(parent, { id }, ctx: Context) {
  //   return ctx.prisma.post({ id })
  // },

  me(parent, args, ctx: Context) {
    const id = getUserId(ctx)
    return ctx.prisma.user({ id })
  },
  mood(parent, args, ctx: Context) {
    const id = getUserId(ctx)
    return ctx.prisma.moods({ where:{owner:{id }} });
  },
  habits(parent, args, ctx: Context) {
    const id = getUserId(ctx)
    return ctx.prisma.habits({ where:{owner:{id }} }) as FragmentableArray<Habit>;
  },
}
