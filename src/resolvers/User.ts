import { Context } from '../utils'
import { UserResolvers } from '../generated/graphqlgen';

export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,
  moods: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).moods()
  },
  habits: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).habits()
  },
}