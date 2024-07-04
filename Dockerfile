# Use the official Nginx image from the Docker Hub
FROM nginx:alpine

# Copy the content of your project to the Nginx HTML directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
