FROM node:15 AS builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./
COPY workingdir/ /app/workingdir
COPY src /app/src
RUN ls -a

RUN npm ci --quiet
RUN npm run build
EXPOSE 7777

CMD [ "node", "." ]