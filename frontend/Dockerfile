# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /frontend

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the local code to the container
COPY . .

# Build the React application
RUN npm run build

# Expose the port on which your React app will run
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]