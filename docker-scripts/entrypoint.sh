#!/bin/bash

# Wait until prisma is avaliable, and download schemas
./docker-scripts/wait-for-it.sh prisma:4466 -- prisma deploy

if [ $RESET = 1 ]; then
  echo "Resetting prisma db"
  yarn prisma seed --reset
  # yarn prisma deploy
fi

graphql get-schema --project prisma
yarn generate

if [ $DEBUG = 1 ]; then

  echo "Running in debug mode"

  yarn start

else

  echo "Running in production mode"

  yarn prod

fi