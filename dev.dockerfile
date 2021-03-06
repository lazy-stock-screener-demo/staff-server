FROM node:10.16.0-jessie

LABEL maintainer_email="universetennis@gmail.com"
LABEL maintainer="Daniel Lin"

RUN npm i -g npm@latest
RUN npm i -g typescript@latest
RUN npm i -g ts-node@latest
RUN useradd --user-group --create-home --shell /bin/bash app
RUN mkdir -p /home/staff/node_modules
RUN chown -R app:app /home/staff/

USER app
WORKDIR /home/staff
COPY package*.json /home/staff/
RUN npm i

EXPOSE 4999
CMD ["npm", "start"]