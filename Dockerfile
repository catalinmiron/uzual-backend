FROM node:10

WORKDIR /usr/src/app

RUN yarn global add graphql-cli prisma

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN chmod -R +x ./docker-scripts/

VOLUME [ "/usr/src/app", "/usr/src/app/node_modules" ]

EXPOSE 4000

ENTRYPOINT ["sh", "/usr/src/app/docker-scripts/entrypoint.sh" ]
