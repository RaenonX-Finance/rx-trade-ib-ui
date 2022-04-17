FROM node:16 as build
MAINTAINER raenonx
WORKDIR /home/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENTRYPOINT ["npm", "run", "prod"]
