FROM node:10.16.0-jessie

LABEL maintainer_email="universetennis@gmail.com"
LABEL maintainer="Daniel Lin"

RUN npm i -g npm@10.16.0
RUN useradd --user-group --create-home --shell /bin/bash app
RUN mkdir -p /home/staff/node_modules
RUN chown -R app:app /home/staff/

USER app
WORKDIR /home/staff
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 5000
CMD ["npm", "run", "prod"]