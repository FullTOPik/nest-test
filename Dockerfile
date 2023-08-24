# Base image
FROM node:18

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ./package*.json ./

# Bundle app source
COPY ./ ./

# Install app dependencies
RUN npm install

# Rebuild bcrypt
RUN npm rebuild bcrypt --build-from-source

# Start the server using the production build
CMD ["npm", "run", "start:dev"]
