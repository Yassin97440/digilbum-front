# Utiliser une image de base Node.js
FROM node:18.14.2-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers nécessaires pour installer les dépendances
COPY package.json .
COPY package-lock.json .

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY ./ .

# Build de l'application Nuxt.js
# RUN npm run build

# Exposer le port nécessaire pour l'application (par exemple, 3000)
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "run", "dev"]


# ARG NODE_VERSION=18.14.2

# FROM node:${NODE_VERSION}-slim as base

# ENV NODE_ENV=development

# WORKDIR /src

# # Build
# FROM base as build

# COPY --link package.json package-lock.json ./
# RUN npm install

# # Run
# FROM base

# COPY --from=build /src/node_modules /src/node_modules

# CMD [ "npm", "run", "dev" ]
# Créez le répertoire de travail dans l'image
# WORKDIR /app

# # copy over package.json files
# COPY package.json /app
# COPY package-lock.json /app

# # install all depencies
# RUN npm install

# # copy over all files to the work directory
# ADD . /app

# # build the project
# RUN npm run build

# # expose the host and port 3000 to the server
# ENV HOST 0.0.0.0
# EXPOSE 3000

# # run the build project with node
# ENTRYPOINT ["node", ".output/server/index.mjs"]