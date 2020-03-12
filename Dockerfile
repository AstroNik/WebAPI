FROM golang:alpine

RUN apk add --update --no-cache ca-certificates git openssh-client

# Set necessary environmet variables needed for our image
ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

# Move to working directory /build
WORKDIR /build

RUN  git config --global url."https://534f45fde3f08def5c597e690efc0af010c858a6:x-oauth-basic@github.com/AstroNik".insteadOf "https://github.com/AstroNik"

# Copy and download dependency using go mod
COPY go.mod .
COPY go.sum .
RUN go mod download

# Copy the code into the container
COPY . .

# Build the application
RUN go build -o main .

# Move to /dist directory as the place for resulting binary folder
WORKDIR /app

# Copy binary from build to main folder
RUN cp /build/main .

# Export necessary port
EXPOSE 8080

# Command to run when starting the container
CMD ["/app/main"]