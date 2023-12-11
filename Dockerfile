FROM node:latest
WORKDIR /usr/src/grocery-bud-react
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm","start" ]