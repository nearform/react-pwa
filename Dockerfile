FROM node:10.1-alpine

# Tell node we are running in prod
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install --silent

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Expose the port the app listens on
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]
