FROM python:3.9-alpine

ENV APP_DIR_NAME backend
ENV APP_PATH /opt/$APP_DIR_NAME

RUN apk update && apk add --virtual build-deps gcc python3-dev musl-dev postgresql-dev postgresql libffi-dev
# Pillow requirements
RUN apk add jpeg-dev zlib-dev freetype-dev lcms2-dev openjpeg-dev tiff-dev tk-dev tcl-dev

# Fonts
ENV LANG en_US.UTF-8
# Install font software, complete font configuration
RUN apk add --update ttf-dejavu fontconfig && rm -rf /var/cache/apk/*

COPY requirements.txt /
RUN pip install -r requirements.txt

COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

RUN mkdir -p $APP_PATH
COPY $APP_DIR_NAME $APP_PATH

COPY $APP_DIR_NAME/.env.develop $APP_PATH