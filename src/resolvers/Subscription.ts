import { Context } from '../utils'
import { SubscriptionResolvers } from '../generated/graphqlgen';

export const Subscription: SubscriptionResolvers.Type = {
  feedSubscription: {
    subscribe: async (parent, args, ctx: Context) => {
      return ctx.prisma.$subscribe
        .post({
          mutation_in: ['CREATED', 'UPDATED'],
        })
        .node()
    },
    resolve: payload => {
      return payload
    },
  },
}
