FROM node:16-alpine

RUN apk --no-cache add --virtual native-deps \
    g++ gcc libgcc libstdc++ linux-headers make python3 && \
    npm install --quiet node-gyp -g

RUN mkdir -p /opt/administration
WORKDIR /opt/administration

COPY ./administration/package.json /opt/administration

RUN yarn install

RUN yarn add serve

COPY ./administration/ /opt/administration
COPY entrypoint.sh /opt/administration
COPY ./administration/.env.production /opt/administration/.env

RUN chmod u+x entrypoint.sh

RUN export NODE_OPTIONS="--max-old-space-size=8192"

WORKDIR /opt/administration

RUN yarn build

ENTRYPOINT ["./entrypoint.sh"]