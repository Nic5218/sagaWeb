FROM node:latest AS node
WORKDIR /app 
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]