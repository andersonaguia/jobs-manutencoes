FROM node:18-alpine AS build

LABEL maintainer="Anderson Aguiar"

WORKDIR /usr/src/app

COPY package*json ./

RUN apk update && apk add tzdata &&\ 
    cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime &&\ 
    echo "America/Sao_Paulo" > /etc/timezone &&\ 
    apk del tzdata && rm -rf /var/cache/apk/*
    
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3002

CMD ["node", "dist/main.js"]