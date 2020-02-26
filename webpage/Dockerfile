FROM node:12 AS dev
COPY front /code/
WORKDIR /code
RUN npm i
RUN npm run gulp
RUN npm run gulp typedoc
#RUN node node_modules/gulp/bin/gulp.js

FROM nginx as server
WORKDIR /var/www
COPY --from=dev /code/serve .
WORKDIR /var/www/docs-frontend
COPY --from=dev /code/docs-frontend .
COPY docs-backend /var/www/docs-backend
COPY nginx.conf /etc/nginx/
