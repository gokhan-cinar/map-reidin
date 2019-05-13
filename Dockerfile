FROM node:11.14-alpine as builder
WORKDIR /app
COPY . .
RUN npm install -g @angular/cli
RUN npm set audit false && npm install
RUN npm run build:prod
#
#
FROM nginx:1.15-alpine
COPY --from=builder /app/dist/ /usr/share/nginx/html
RUN mkdir /etc/nginx/ssl
COPY --from=builder /app/tls*  /etc/nginx/ssl/
EXPOSE 80 443
