FROM node:18-alpine

WORKDIR /app
RUN apk update && apk add --no-cache g++
COPY package*.json ./
RUN npm install --force
COPY . .

CMD ["node", "index.js"]

EXPOSE 3000