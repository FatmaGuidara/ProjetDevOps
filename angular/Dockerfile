# Use the official Node.js image as the base image
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package* ./

# Install the dependencies
RUN npm i

# Copy the rest of the application's files to the working directory
COPY . .

# Build the application
RUN npm run build

# Expose the port that the application will run on
EXPOSE 4200

# Start the application
CMD ["npm", "start"]
