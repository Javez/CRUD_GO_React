# Use the official Go image as a base image
FROM golang:latest

WORKDIR /backend

# Copy the local package files to the container's workspace
COPY . .

# Build the Go application
RUN go build -o main ./main

# Set permissions for the binary
RUN chmod +x main

# Expose port
EXPOSE 8080

# Run the executable
CMD ["go run main.go"]