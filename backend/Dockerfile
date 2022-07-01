FROM python:3.9-slim

ENV APP_DIR_NAME backend
ENV APP_PATH /opt/$APP_DIR_NAME

RUN apt-get update && apt-get install -y gcc python3-dev musl-dev postgresql libpq-dev libffi-dev
# Pillow requirements
RUN apt-get install -y libtiff5-dev libjpeg62-turbo-dev zlib1g-dev libfreetype6-dev liblcms2-dev libwebp-dev tk-dev tcl-dev

# Fonts
ENV LANG en_US.UTF-8
# Install font software, complete font configuration
RUN apt-get install -y fonts-dejavu fontconfig

COPY requirements.txt /
RUN pip install -r requirements.txt

COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

RUN mkdir -p $APP_PATH
COPY $APP_DIR_NAME $APP_PATH

COPY $APP_DIR_NAME/.env.develop $APP_PATH