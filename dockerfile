FROM nginx:alpine
COPY ./dist/frontofficeangular /usr/share/nginx/html
COPY ./nginx.config /etc/nginx/conf.d/default.conf
