FROM node:14
# App directory
WORKDIR /usr/src/app
COPY package*.json ./
COPY ./.env ./
RUN npm install
RUN npm run build
COPY . .
EXPOSE 8000

