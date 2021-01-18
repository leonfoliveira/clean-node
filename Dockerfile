FROM node:14-alpine
WORKDIR /usr/src/clean-node-api
COPY package.json .
RUN yarn install --production
COPY dist dist
EXPOSE 4001
CMD yarn start