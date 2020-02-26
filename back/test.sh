#!/bin/sh
echo "Testing model..."
docker-compose up -d db
echo "Sleeping for 2 seconds"
sleep 2
go test -v -count=1 ./back/model
docker-compose stop db
docker-compose rm -f db
echo "Testing processing..."
docker-compose up -d db
echo "Sleeping for 2 seconds"
sleep 2
go test -v -count=1 ./back/processing
docker-compose stop db
docker-compose rm -f db
