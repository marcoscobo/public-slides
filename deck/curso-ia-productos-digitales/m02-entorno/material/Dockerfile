# Base image: Node.js 20 LTS — same version as the Module 04 DevContainer
# (mcr.microsoft.com/devcontainers/javascript-node:20)
FROM node:20-alpine

# Patch OS-level packages at build time — floating base image tags can lag
# behind newly disclosed CVEs between releases.
RUN apk update && apk upgrade --no-cache

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
