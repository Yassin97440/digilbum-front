FROM node:18-alpine as dev-env
WORKDIR /app
COPY package*.json /app/
COPY .env /app/.env
RUN npm install
COPY . /app/
EXPOSE 3000 3010
CMD ["npm", "run", "dev"]


FROM node:18-alpine as build-env
WORKDIR /app
COPY package*.json ./
RUN cat .env
COPY .env .env
RUN npm install
COPY . .
RUN npm run build 

FROM node:18-alpine as prod-env
WORKDIR /app
COPY package*.json ./
COPY .env .env
RUN npm install --omit=dev
COPY --from=build-env /app/.nuxt /app/.nuxt
COPY --from=build-env /app/.output /app/.output
COPY --from=build-env /app/.env /app/.env
EXPOSE 3000
CMD ["npm", "run", "start"]