FROM node:10-alpine
WORKDIR '/app'

EXPOSE 3001

RUN apk --update add curl nano

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]

