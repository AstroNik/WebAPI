# syntax=docker/dockerfile:experimental
FROM golang:alpine

RUN apk add --update --no-cache ca-certificates git openssh-client

# Set necessary environmet variables needed for our image
ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

# Move to working directory /build
WORKDIR /build

RUN git config --system url."ssh://git@github.com/".insteadOf "https://github.com/"

RUN set -euo pipefail && \
    mkdir -p -m 0600 ~/.ssh && \
    ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts && \
    ssh-keygen -F github.com -l -E sha256 \
        | grep -q "SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8"



# Copy and download dependency using go mod
COPY go.mod .
COPY go.sum .

RUN --mount=type=ssh mkdir -p /var/ssh && \
    GIT_SSH_COMMAND="ssh -o \"ControlMaster auto\" -o \"ControlPersist 300\" -o \"ControlPath /var/ssh/%r@%h:%p\"" \
    go mod download

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