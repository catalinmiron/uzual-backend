import { booleanArg, arg, stringArg, idArg, mutationType } from 'nexus';
import * as bcrypt from 'bcryptjs';
import { APP_SECRET, getUserId } from '../utils';
import { sign } from 'jsonwebtoken';
import { Context } from '../types';

export const Mutation = mutationType({
  definition(t) {
    t.field('setPushToken', {
      type: 'User',
      args: {
        pushToken: stringArg()
      },
      resolve: async (parent, { pushToken }, ctx: Context) => {
        const userId = getUserId(ctx);
        return ctx.prisma.updateUser({
          where: {
            id: userId
          },
          data: {
            pushToken
          }
        });
      }
    });
    t.field('setMood', {
      type: 'Mood',
      args: {
        date: stringArg({
          default: new Date().toISOString().split('T')[0],
          required: false
        }),
        type: arg({
          type: 'MoodTypes',
          required: true
        })
      },
      resolve: async (parent, { date, type }, ctx: Context) => {
        const userId = getUserId(ctx);
        const dayMood = await ctx.prisma.moods({
          where: {
            date: date,
            owner: {
              id: userId
            }
          }
        });
        if (dayMood.length === 0) {
          console.log('Create Mood');
          return ctx.prisma.createMood({
            owner: {
              connect: {
                id: userId
              }
            },
            date,
            type
          });
        } else {
          console.log('Update Mood');
          return ctx.prisma.updateMood({
            where: { id: dayMood[0].id },
            data: {
              date,
              type
            }
          });
        }
      }
    });
    t.field('createHabit', {
      type: 'Habit',
      args: {
        id: idArg({ default: '', required: false }),
        title: stringArg({ required: true }),
        description: stringArg({ required: false, default: '' }),
        starred: booleanArg({ default: false, nullable: true })
      },
      resolve: (parent, { id, title, description, starred }, ctx: Context) => {
        const userId = getUserId(ctx);
        return ctx.prisma.upsertHabit({
          where: { id },
          create: {
            description: description || '',
            starred: !!starred,
            title,
            owner: { connect: { id: userId } }
          },
          update: {
            ...(description && { description }),
            ...(title && { title }),
            starred: !!starred
          }
        });
      }
    });
    t.field('deleteHabit', {
      type: 'Habit',
      args: {
        id: idArg()
      },
      resolve: async (parent, { id }, ctx: Context) => {
        const userId = getUserId(ctx);
        await ctx.prisma.deleteManyDayHabits({
          habit: {
            id
          }
        });
        console.log('Delete Habit');
        return ctx.prisma.deleteHabit({
          id
        });
      }
    });
    t.field('setDailyHabit', {
      type: 'DayHabit',
      args: {
        habitId: idArg(),
        date: stringArg({
          default: new Date().toISOString().split('T')[0],
          required: false
        })
      },
      resolve: async (parent, { habitId, date }, ctx: Context) => {
        const userId = getUserId(ctx);
        const query = `
          query habit($habitId:ID!, $date: DateTime!){
            habit(where:{id: $habitId}) {
              habits(where:{date: $date}){
                id
                done
                date
              }
            }
          }
        `;

        const { habit } = await ctx.prisma.$graphql(query, {
          habitId,
          date
        });

        if (habit.habits.length === 0) {
          console.log('Create DayHabit');
          return ctx.prisma.createDayHabit({
            date,
            done: true,
            habit: { connect: { id: habitId } }
          });
        } else {
          console.log('Update DayHabit');
          return ctx.prisma.updateDayHabit({
            where: { id: habit.habits[0].id },
            data: {
              date,
              done: !habit.habits[0].done
            }
          });
        }
      }
    });
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: stringArg({ nullable: true }),
        email: stringArg(),
        password: stringArg()
      },
      resolve: async (parent, { name, email, password }, ctx) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await ctx.prisma.createUser({
          name,
          email,
          password: hashedPassword
        });
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user
        };
      }
    });

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: stringArg(),
        password: stringArg()
      },
      resolve: async (parent, { email, password }, context) => {
        const user = await context.prisma.user({ email });
        if (!user) {
          throw new Error(`No user found for email: ${email}`);
        }
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
          throw new Error('Invalid password');
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user
        };
      }
    });
  }
});
