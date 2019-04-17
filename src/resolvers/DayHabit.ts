import { Context } from '../utils'
import { DayHabitResolvers } from '../generated/graphqlgen';

export const DayHabit: DayHabitResolvers.Type = {
  ...DayHabitResolvers.defaultResolvers,

  habit: ({id}, args, ctx: Context) => {
    return ctx.prisma.dayHabit({ id }).habit()
  }
};