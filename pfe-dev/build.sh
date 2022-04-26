#!/bin/bash
sudo rm -rf ../frontend/administration/node_modules
sudo rm -rf ../frontend/administration/yarn.lock

sudo docker build -t pfe/frontend:1.0 ../frontend
sudo docker build -t pfe/backend:1.0 ../backend