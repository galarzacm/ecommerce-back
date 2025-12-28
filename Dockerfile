# Usa una imagen base
# FROM node:21-alpine AS development
FROM node:18-alpine AS development
# Crea el directorio de la app
WORKDIR /usr/src/app
# Copia package.json y package-lock.json
COPY package*.json ./
# Instala dependencias usando lockfile
RUN npm ci
# Copia el resto del código
COPY . .

#FROM node:21-alpine AS build
FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY package.json ./

COPY --from=development /usr/src/app/node_modules ./node_modules

COPY . .

RUN npm run build

RUN npm ci --onlyproduction && npm cache clear --force

#FROM node:21-alpine AS production
FROM node:18-alpine AS development

COPY --from=development /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
# Expone el puerto
EXPOSE 3000
# Comando de inicio
CMD [ "node", "dist/main.js" ]

