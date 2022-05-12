FROM python:3.9-slim

RUN apt-get update && apt-get -y install python3-dev gcc musl-dev python3-opencv

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

COPY . /app

CMD [ "python", "app.py" ]