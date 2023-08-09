FROM node:14-buster

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install && npm install typescript --save-dev && npm install -g @angular/cli@10.1.7 && npm install --save-dev @angular-devkit/build-angular

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--poll=2000"]
