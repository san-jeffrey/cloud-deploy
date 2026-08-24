FROM nginx:latest

COPY Portfolio/ /usr/share/nginx/html/

EXPOSE 80