import { stringArg, idArg, mutationType, scalarType, enumType } from 'nexus'
import * as bcrypt from 'bcryptjs'
import { APP_SECRET, getUserId } from '../utils'
import { sign } from 'jsonwebtoken'
import { NexusTypes, arg } from 'nexus/dist/core';
import { MoodTypes } from '../generated/prisma-client';


export const Mutation = mutationType({
  definition(t) {
    t.field('addMood', {
      type: 'Mood',
      args:{
        date: stringArg({}),
        type: arg({
          type: 'MoodTypes',
          nullable: false
        })
      },
      resolve: (parent, { date, type }, ctx) => {
        const userId = getUserId(ctx);
        return ctx.prisma.createMood({
          date,
          type,
          owner: { connect: { id: userId } }
        })
      },
    })
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: stringArg({ nullable: true }),
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (parent, { name, email, password }, ctx) => {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await ctx.prisma.createUser({
          name,
          email,
          password: hashedPassword,
        })
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (parent, { email, password }, context) => {
        const user = await context.prisma.user({ email })
        if (!user) {
          throw new Error(`No user found for email: ${email}`)
        }
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('createDraft', {
      type: 'Post',
      args: {
        title: stringArg(),
        content: stringArg({ nullable: true }),
      },
      resolve: (parent, { title, content }, ctx) => {
        const userId = getUserId(ctx)
        return ctx.prisma.createPost({
          title,
          content,
          author: { connect: { id: userId } },
        })
      },
    })

    t.field('deletePost', {
      type: 'Post',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.deletePost({ id })
      },
    })

    t.field('publish', {
      type: 'Post',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.updatePost({
          where: { id },
          data: { published: true },
        })
      },
    })
  },
})