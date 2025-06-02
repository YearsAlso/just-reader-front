FROM openresty/openresty:alpine
# Copy the Nginx configuration file
COPY ./config/nginx.conf /etc/nginx/nginx.conf

# Copy the static files to the Nginx HTML directory
COPY ./dist /usr/share/nginx/html
# Expose port 80
EXPOSE 80
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
# Set the working directory
WORKDIR /usr/share/nginx/html
# Set the environment variable for the Nginx configuration
ENV NGINX_CONFIG /etc/nginx/nginx.conf
# Set the environment variable for the static files directory
ENV STATIC_FILES_DIR /usr/share/nginx/html
# Set the environment variable for the Nginx log directory
ENV NGINX_LOG_DIR /var/log/nginx
# Set the environment variable for the Nginx PID file
ENV NGINX_PID_FILE /var/run/nginx.pid
# Set the environment variable for the Nginx error log
ENV NGINX_ERROR_LOG /var/log/nginx/error.log
# Set the environment variable for the Nginx access log
ENV NGINX_ACCESS_LOG /var/log/nginx/access.log
# Set the environment variable for the Nginx daemon off
ENV NGINX_DAEMON_OFF "daemon off;"
