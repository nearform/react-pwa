FROM nearform/alpine3-s2i-nodejs:8

# Create app directory
WORKDIR /opt/app-root/src

COPY package*.json ./
RUN yarn install --production=false
COPY . .

RUN yarn run build

EXPOSE 3000

CMD [ "yarn", "start" ]
