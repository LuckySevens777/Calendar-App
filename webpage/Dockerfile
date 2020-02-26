FROM frontend as dev
COPY front /code/
WORKDIR /code
RUN npm run gulp
RUN npm run gulp typedoc
#RUN node node_modules/gulp/bin/gulp.js

FROM nginx as server
RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "curl"]
WORKDIR /var/www
COPY --from=dev /code/serve .
WORKDIR /var/www/docs-frontend
COPY --from=dev /code/docs-frontend .
COPY nginx.conf /etc/nginx/
