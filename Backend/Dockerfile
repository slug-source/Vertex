FROM node:22-alpine

WORKDIR /app
RUN apk add --no-cache python3 py3-pip g++ make
COPY package*.json ./
RUN npm ci
COPY . .

CMD ["node", "index.js"]

EXPOSE 5000