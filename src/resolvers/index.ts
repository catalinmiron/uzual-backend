import { Query } from './Query'
import { Subscription } from './Subscription'
import { auth } from './Mutation/auth'
import { mood } from './Mutation/mood'
import { habit } from './Mutation/habit'
import { User } from './User'
import { Habit } from './Habit'
import { DayHabit } from './DayHabit'
import { Post } from './Post'

export default {
  Query,
  Mutation: {
    ...auth,
    ...mood,
    ...habit
  },
  Subscription,
  User,
  Post,
  DayHabit,
  Habit
}
