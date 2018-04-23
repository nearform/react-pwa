FROM stefanscherer/node-windows

# Create app directory
WORKDIR /opt/app-root/src

COPY package*.json ./
RUN yarn install
COPY . .

RUN yarn run build

EXPOSE 3000

CMD [ "yarn", "start" ]
