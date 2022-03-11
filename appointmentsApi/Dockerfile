FROM node:latest
WORKDIR /appointments-api
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]