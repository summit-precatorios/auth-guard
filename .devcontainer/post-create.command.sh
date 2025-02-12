#!/bin/sh

echo "Installing developer requirements" 

docker compose -f ./docker-compose.development.local.yml up --build -d 
npm i -g dotenv-cli && \
    npm run prisma:migrate/dev && \
    npm run start:dev

