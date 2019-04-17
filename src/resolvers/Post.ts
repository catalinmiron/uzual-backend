import { Context } from '../utils'
import { PostResolvers } from '../generated/graphqlgen';

export const Post:PostResolvers.Type = {
  ...PostResolvers.defaultResolvers,
  author: ({ id }, args, ctx: Context) => {
    return ctx.prisma.post({ id }).author()
  },
}
