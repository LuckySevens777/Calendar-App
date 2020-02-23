#!/bin/sh
#echo "Testing model..."
#docker-compose up -d testdb
#echo "Sleeping for 2 seconds"
#sleep 2
#go test -v -count=1 ./back/model
#docker-compose stop testdb
#docker-compose rm -f testdb
echo "Testing processing..."
docker-compose up -d testdb
echo "Sleeping for 2 seconds"
sleep 2
go test -v -count=1 ./back/processing
docker-compose stop testdb
docker-compose rm -f testdb
