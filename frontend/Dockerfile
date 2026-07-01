# IDK WHAT AM I DOING TBH
# node version 22 as image
FROM node:24-alpine

#app directory
WORKDIR /app

COPY package*.json ./
RUN npm install

# copy rest of the app into the container
COPY . . 

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]