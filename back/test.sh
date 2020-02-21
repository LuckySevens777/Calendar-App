#!/bin/sh
docker-compose up -d testdb
echo "Sleeping for 2 seconds"
sleep 2
go test -v -count=1 ./...
docker-compose stop testdb
docker-compose rm -f testdb
