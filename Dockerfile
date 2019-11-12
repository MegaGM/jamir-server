FROM node:lts-alpine

RUN mkdir -p /app
WORKDIR /app
# COPY ./package.json ./package-lock.json /app
# RUN npm install .
# COPY . /app

EXPOSE 8000

CMD ["npm", "run", "start:docker"]
