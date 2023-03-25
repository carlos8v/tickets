FROM node:15.14.0-slim AS builder
WORKDIR /build

COPY package*.json ./
RUN npm ci --silent

COPY src/ ./src
COPY public/ ./public
COPY index.html vite.config.js ./
RUN npm run build

FROM nginx:1.23.2
COPY --from=builder /build/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/templates/default.conf.template
