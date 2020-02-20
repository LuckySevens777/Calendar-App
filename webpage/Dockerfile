FROM node:12 AS dev
COPY front /code/
WORKDIR /code
RUN ls /code
RUN npm i
RUN npm run gulp
RUN npm run gulp typedoc
RUN ls

FROM nginx as server
WORKDIR /var/www
COPY --from=dev /code/serve .
WORKDIR /var/www/docs-frontend
COPY --from=dev /code/docs-frontend .
COPY nginx.conf /etc/nginx/
