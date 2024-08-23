# Base image
FROM node:22-alpine

ARG ENV
ARG PORT
ARG TOKEN
ARG DB_TYPE
ARG DB_HOST
ARG DB_PORT
ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_DATABASE

ENV ENV=${ENV}
ENV PORT=${PORT}
ENV TOKEN=${TOKEN}
ENV DB_TYPE=${DB_TYPE}
ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_USERNAME=${DB_USERNAME}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_DATABASE=${DB_DATABASE}

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./
COPY yarn.lock ./

# Install app dependencies
# RUN npm install -g yarn
RUN yarn

# Bundle app source
COPY . .


# Creates a "dist" folder with the production build
RUN yarn build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]