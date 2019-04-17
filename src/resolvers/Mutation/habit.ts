import { getUserId, Context } from '../../utils'
import { MutationResolvers } from '../../generated/graphqlgen';
import { HabitPromise } from '../../generated/prisma-client';
import { Habit } from '../../types';

export const habit: Partial<MutationResolvers.Type> = {
  ...MutationResolvers.defaultResolvers,
  setMood: (parent, {date, id, type}, ctx: Context) => {
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
  },
  addHabit: (parent, {description, title}, ctx: Context) => {
    const userId = getUserId(ctx);

    return ctx.prisma.createHabit({
      description: description || "",
      owner: {connect:{id: userId}},
      starred: false,
      title
    }) as Promise<Habit>
  },
  addDailyHabit(parent, { date,done,habitId }, ctx: Context) {
    const userId = getUserId(ctx);

    return ctx.prisma.createDayHabit({
      date,
      done: done ? true : false,
      habit: {connect:{id: habitId}}
    })
  }
}