#################
# Build the app #
#################
FROM node:latest as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --omit=dev

################
# Run in NGINX #
################
FROM nginx:alpine
COPY --from=build /app/dist/capi-browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/
