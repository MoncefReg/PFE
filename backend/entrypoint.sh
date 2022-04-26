#!/bin/sh
cd $APP_PATH

# check if the database is ready
echo "Waiting for Postgres DB"
while ! pg_isready -h $PG_HOSTNAME > /dev/null 2>&1;
do
  echo -n "."
  sleep 1
done
echo "Postgres DB is ready"
chmod +x manage.py
# create tables
echo "Updating Database Tables"
python manage.py makemigrations
python manage.py makemigrations baseapp
python manage.py makemigrations authapp
python manage.py migrate
echo "The Database has been updated"

# collect static files
python manage.py collectstatic --no-input

# run the server
echo "Starting the server..."
python manage.py runserver 0.0.0.0:8888