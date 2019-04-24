FROM node:8-slim

WORKDIR /usr/src/app

RUN yarn global add prisma@1.29 npx

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY .env ./
COPY . .

RUN chmod -R +x ./docker-scripts/

VOLUME [ "/usr/src/app", "/usr/src/app/node_modules" ]

EXPOSE 4000

ENTRYPOINT ["sh", "/usr/src/app/docker-scripts/entrypoint.sh" ]
