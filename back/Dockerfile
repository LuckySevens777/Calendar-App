FROM golang
WORKDIR /
RUN go get -u github.com/gorilla/mux
RUN go get -u github.com/rs/cors
COPY . .
RUN go run listener.go
