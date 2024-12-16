FROM node:18-alpine as dev-env
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
EXPOSE 3000 3010
CMD ["npm", "run", "dev"]


FROM node:18-alpine as build-env
WORKDIR /app
ADD . /app
RUN npm install
RUN npm run build 

FROM node:18-alpine as prod-env
WORKDIR /app
COPY package*.json ./
# ADD ../.env .
ADD nuxt.config.ts .
COPY --from=build-env /app/.nuxt /app/.nuxt
COPY --from=build-env /app/.output /app/.output
EXPOSE 3000
CMD ["npm", "run", "start"]