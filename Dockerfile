FROM node:10.16.0-alpine

WORKDIR /opt/app

COPY build build/
COPY node_modules node_modules/

ENV NODE_ENV production

EXPOSE 3200
CMD [ "node", "./build/main.js" ]
