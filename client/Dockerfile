FROM node:alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm i
COPY . .
RUN npm run build

FROM nginx
COPY --from=builder /app/build /usr/shared/nginx/html
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80