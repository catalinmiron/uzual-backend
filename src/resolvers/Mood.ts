import { Context } from '../utils'
import { MoodResolvers } from '../generated/graphqlgen';

export const User: MoodResolvers.Type = {
  ...MoodResolvers.defaultResolvers,
  type: ({ id }, args, ctx: Context) => {
    return ctx.prisma.mood({ id }).type()
  },
  owner: ({ id }, args, ctx: Context) => {
    return ctx.prisma.mood({ id }).owner()
  },
}
