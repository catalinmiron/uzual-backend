import { getUserId, Context } from '../../utils'
import { MutationResolvers } from '../../generated/graphqlgen';

export const mood: Partial<MutationResolvers.Type> = {
  ...MutationResolvers.defaultResolvers,
  async setMood(parent, { id, date, type }, ctx: Context, info) {
    const userId = getUserId(ctx);

    return ctx.prisma.upsertMood({
      where: {
        id: id || ""
      },
      create: {
        date,
        type,
        owner: {
          connect: { id: userId },
        },
      },
      update: {
        type
      }
    })
  }
}