FROM node:9.10-alpine

# Create app directory
WORKDIR /opt/app-root/src

COPY package*.json ./
RUN yarn install
COPY . .

RUN yarn run build

EXPOSE 3000

CMD [ "yarn", "start" ]
