FROM golang
WORKDIR /
COPY . .
RUN go get golang.org/x/tools/cmd/godoc
RUN go build
CMD ./back
