#!/bin/bash

# Wait until prisma is avaliable, and download schemas
./docker-scripts/wait-for-it.sh $PRISMA_ENDPOINT:$PRISMA_PORT -- prisma deploy

if [ $RESET = 1 ]; then
  echo "Resetting prisma db"
  prisma seed --reset
  # yarn prisma deploy
fi

if [ $DEBUG = 1 ]; then

  echo "Running in debug mode"

  yarn start

else

  echo "Running in production mode"

  yarn prod

fi