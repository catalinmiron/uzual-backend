import { rule, shield } from 'graphql-shield'
import { getUserId } from '../utils'

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    const userId = getUserId(context)
    return Boolean(userId)
  }),
  // isPostOwner: rule()(async (parent, { id }, context) => {
  //   const userId = getUserId(context)
  //   const author = await context.prisma.habits({
  //     where: {owner:{id: userId}}
  //   }).author()
  //   return userId === author.id
  // }),
}

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
    habits: rules.isAuthenticatedUser,
    moods: rules.isAuthenticatedUser
  },
  Mutation: {
    setMood: rules.isAuthenticatedUser,
    createHabit: rules.isAuthenticatedUser,
    setDailyHabit: rules.isAuthenticatedUser
  },
})
