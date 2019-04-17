import { Context } from '../utils'
import { HabitResolvers } from '../generated/graphqlgen';

export const Habit: HabitResolvers.Type = {
  ...HabitResolvers.defaultResolvers,
  owner: ({id}, args, ctx: Context) => {
    return ctx.prisma.habit({ id }).owner()
  },
  habits: ({id}, args, ctx: Context) => {
    return ctx.prisma.habit({ id }).habits()
  }
};