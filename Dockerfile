FROM node:16
WORKDIR /
COPY package.json .
COPY package-lock.json .
RUN  npm install
COPY . .
RUN npm run build
COPY .env ./dist/
WORKDIR ./dist
EXPOSE 1000
CMD ["node", "app.js"]