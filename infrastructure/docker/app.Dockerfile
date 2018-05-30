FROM nearform/alpine3-s2i-nodejs:8

# Create app directory
WORKDIR /opt/app-root/src

COPY package*.json ./
RUN npm install --production
COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
