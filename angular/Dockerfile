# # Use the official Node.js image as the base image
# FROM node:lts-alpine

# # Set the working directory in the container
# WORKDIR /app

# # Copy the package.json and package-lock.json files to the working directory
# COPY package* ./

# # Install the dependencies
# RUN npm install -g npm@9.3.0
# RUN npm install

# # Copy the rest of the application's files to the working directory
# COPY . .

# # Build the application
# RUN npm run build

# # Expose the port that the application will run on
# EXPOSE 4200

# # Start the application
# CMD ["npm", "start"]
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
FROM nginx:alpine
COPY --from=node /app/dist/ecommerce-angular /usr/share/nginx/html
EXPOSE 4200