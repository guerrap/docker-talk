FROM php:7.4-apache
COPY ./src /var/www/html
RUN apt-get update && apt-get install libpq-dev postgresql -y && docker-php-ext-install pdo pdo_pgsql