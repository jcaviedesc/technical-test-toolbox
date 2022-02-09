# pull official base image
FROM node:14.16.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

COPY . ./

EXPOSE 8081
# start app
CMD ["npm", "start"]
