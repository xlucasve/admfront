FROM node:20-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./


RUN npm install

COPY --chown=node:node . .

ARG VITE_API_URL_BACKEND

ENV VITE_API_URL_BACKEND=$VITE_API_URL_BACKEND

EXPOSE 80

#CMD ["npm", "run", "dev"]

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "80"]
