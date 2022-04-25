FROM node:16-alpine
RUN mkdir -p /home/node && chown -R node:node /home/node
WORKDIR /home/node
USER node
ENV PORT=80
COPY --chown=node:node . .
RUN npm install
EXPOSE 80
CMD [ "node", "app.js" ]