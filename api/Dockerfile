FROM node:lts-alpine

WORKDIR /app

COPY package* ./

RUN npm i

COPY . .

EXPOSE 5000

CMD ["npm", "start"]