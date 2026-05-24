FROM node:slim
ENV NODE_ENV=develop
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --legacy-peer-deps --develop --silent && mv node_modules ../
COPY . .
EXPOSE 4004
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "run", "start:dev"]
