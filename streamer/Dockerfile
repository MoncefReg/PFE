FROM python:3.9-alpine

WORKDIR /app

COPY requirements.txt .

RUN pip install --upgrade pip && pip install -r requirements.txt

COPY ./app /app

ENTRYPOINT ["./entrypoint.sh"]