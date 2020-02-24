FROM node:12 AS dev
COPY front /code/
WORKDIR /code
RUN ls /code
RUN npm i
RUN npm run gulp
#RUN node node_modules/gulp/bin/gulp.js

FROM nginx as server
WORKDIR /var/www
COPY --from=dev /code/serve .
COPY nginx.conf /etc/nginx/
