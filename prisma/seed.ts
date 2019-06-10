import { prisma } from '../src/generated/prisma-client';

async function main() {
  await prisma.createUser({
    email: 'miron.catalin@gmail.com',
    password: '$2a$10$p8M.xZCmVtXtv1dZ02mZVe944PdIUwGoLYpNTg0EBLrZ2Di3f04xK',
    name: 'Catalin Miron 2',
    isPro: true,
    moods: {
      create: [
        { type: 'Smile', date: '2019-04-01' },
        { type: 'Dizzy', date: '2019-04-02' },
        { type: 'Smile', date: '2019-04-03' },
        { type: 'Frown', date: '2019-04-04' },
        { type: 'Laugh', date: '2019-04-05' },
        { type: 'Laugh', date: '2019-04-07' },
        { type: 'Smile', date: '2019-04-08' },
        { type: 'Smile', date: '2019-04-10' },
        { type: 'GrinHearts', date: '2019-04-11' },
        { type: 'Frown', date: '2019-04-12' },
        { type: 'Smile', date: '2019-04-13' },
        { type: 'FrownOpen', date: '2019-04-14' },
        { type: 'Smile', date: '2019-04-15' },
        { type: 'Frown', date: '2019-04-16' },
        { type: 'Smile', date: '2019-04-17' },
        { type: 'GrinHearts', date: '2019-04-18' },
        { type: 'Dizzy', date: '2019-04-20' },
        { type: 'Smile', date: '2019-04-23' },
        { type: 'Laugh', date: '2019-04-24' }
      ]
    },
    habits: {
      create: [
        {
          title: 'Just run!',
          description: "Let's try this and see the results",
          starred: true,
          habits: {
            create: [
              { done: true, date: '2019-04-01' },
              { done: true, date: '2019-04-02' },
              { done: false, date: '2019-04-03' },
              { done: true, date: '2019-04-04' },
              { done: true, date: '2019-04-05' },
              { done: false, date: '2019-04-07' },
              { done: false, date: '2019-04-08' },
              { done: true, date: '2019-04-10' },
              { done: true, date: '2019-04-11' },
              { done: false, date: '2019-04-12' },
              { done: true, date: '2019-04-13' }
            ]
          }
        },
        {
          title: '1 Coffee / day',
          description: 'Just one coffee and see how it feels',
          starred: true,
          habits: {
            create: [
              { done: true, date: '2019-04-01' },
              { done: true, date: '2019-04-02' },
              { done: true, date: '2019-04-03' },
              { done: true, date: '2019-04-04' },
              { done: false, date: '2019-04-05' },
              { done: true, date: '2019-04-07' },
              { done: true, date: '2019-04-08' },
              { done: true, date: '2019-04-10' },
              { done: false, date: '2019-04-11' },
              { done: false, date: '2019-04-12' },
              { done: false, date: '2019-04-13' },
              { done: true, date: '2019-04-14' },
              { done: true, date: '2019-04-15' },
              { done: true, date: '2019-04-16' },
              { done: true, date: '2019-04-17' },
              { done: false, date: '2019-04-18' },
              { done: true, date: '2019-04-20' },
              { done: true, date: '2019-04-23' },
              { done: true, date: '2019-04-24' }
            ]
          }
        }
      ]
    }
  });
  await prisma.createUser({
    email: 'mironcatalin@gmail.com',
    password: '$2a$10$p8M.xZCmVtXtv1dZ02mZVe944PdIUwGoLYpNTg0EBLrZ2Di3f04xK',
    name: 'Catalin Miron',
    isPro: true,
    moods: {
      create: [
        { type: 'Smile', date: '2019-05-01' },
        { type: 'Dizzy', date: '2019-05-02' },
        { type: 'Smile', date: '2019-05-03' },
        { type: 'Frown', date: '2019-05-04' },
        { type: 'Laugh', date: '2019-05-05' },
        { type: 'Laugh', date: '2019-05-07' },
        { type: 'Smile', date: '2019-05-08' },
        { type: 'Smile', date: '2019-05-10' },
        { type: 'GrinHearts', date: '2019-05-11' },
        { type: 'Frown', date: '2019-05-12' },
        { type: 'Smile', date: '2019-05-13' },
        { type: 'FrownOpen', date: '2019-05-14' },
        { type: 'Smile', date: '2019-05-15' },
        { type: 'Frown', date: '2019-05-16' },
        { type: 'Smile', date: '2019-05-17' },
        { type: 'GrinHearts', date: '2019-05-18' },
        { type: 'Dizzy', date: '2019-05-20' },
        { type: 'Smile', date: '2019-05-23' },
        { type: 'Laugh', date: '2019-05-24' }
      ]
    },
    habits: {
      create: [
        {
          title: 'Just run!',
          description: "Let's try this and see the results",
          starred: true,
          habits: {
            create: [
              { done: true, date: '2019-04-01' },
              { done: true, date: '2019-04-02' },
              { done: false, date: '2019-04-03' },
              { done: true, date: '2019-04-04' },
              { done: true, date: '2019-04-05' },
              { done: false, date: '2019-04-07' },
              { done: false, date: '2019-04-08' },
              { done: true, date: '2019-04-10' },
              { done: true, date: '2019-04-11' },
              { done: false, date: '2019-04-12' },
              { done: true, date: '2019-04-13' }
            ]
          }
        },
        {
          title: '1 Coffee / day',
          description: 'Just one coffee and see how it feels',
          starred: true,
          habits: {
            create: [
              { done: true, date: '2019-04-01' },
              { done: true, date: '2019-04-02' },
              { done: true, date: '2019-04-03' },
              { done: true, date: '2019-04-04' },
              { done: false, date: '2019-04-05' },
              { done: true, date: '2019-04-07' },
              { done: true, date: '2019-04-08' },
              { done: true, date: '2019-04-10' },
              { done: false, date: '2019-04-11' },
              { done: false, date: '2019-04-12' },
              { done: false, date: '2019-04-13' },
              { done: true, date: '2019-04-14' },
              { done: true, date: '2019-04-15' },
              { done: true, date: '2019-04-16' },
              { done: true, date: '2019-04-17' },
              { done: false, date: '2019-04-18' },
              { done: true, date: '2019-04-20' },
              { done: true, date: '2019-04-23' },
              { done: true, date: '2019-04-24' }
            ]
          }
        }
      ]
    }
  });
}

main();
