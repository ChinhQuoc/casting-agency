# Step 1: Use Node.js as the base image for building the Angular app
FROM node:18-alpine AS build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app for production
RUN npm run build -- --configuration production

# Step 2: Use NGINX as the base image for serving the Angular app
FROM nginx:stable-alpine AS production-stage

# Copy the built Angular app from the build stage
COPY --from=build-stage /app/dist/web-app /usr/share/nginx/html

# Expose port 80 for the NGINX server
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
