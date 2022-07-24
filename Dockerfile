FROM node:16-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --chown=node:node . /usr/src/app
RUN npm ci --only=production
EXPOSE 3000
USER node
CMD [ "node", "index.js" ]