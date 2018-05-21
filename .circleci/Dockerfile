FROM node:10.1-alpine

# Tell node we are running in prod
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Create app directory
WORKDIR /usr/src/app

# Copy application source - Note: the app is not built in Docker
COPY package*.json *.config.js ./
COPY dist ./dist
COPY src ./src

# Install app dependencies
RUN npm install --silent

# Expose the port the app listens on
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]
