FROM node:latest
WORKDIR /usr/src/grocery-bud-react
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
WORKDIR /usr/src/grocery-bud-react/build
EXPOSE 3000
CMD [ "npm","start" ]