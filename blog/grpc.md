---
slug: go-grpc-guide
title: "gRPC for Go Developers: A Practical Guide"
date: 03/20/2025
authors: rohan
tags: ["go", "grpc"]
image: /img/lucian-alexe-yh0UtueiZ-I-unsplash.jpg
---

### What is gRPC ?

gRPC stands for Google Remote Procedure Calls and it is a framework for building APIs. It uses HTTP/2 which allows developers to build high performance APIs. Though it has limited browser support, it is better suited for internal systems that require real-time streaming and has large data loads. In this tutorial we would code some simple gRPC APIs. Checkout this video if you wish to know more about [gRPC](https://youtu.be/E3ez34fdC0k?si=EHW15Eq7QiboCr9P)

![Photo by <a href="https://unsplash.com/@lucian_alexe?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Lucian Alexe</a> on <a href="https://unsplash.com/photos/orange-usb-cables-yh0UtueiZ-I?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>](/img/lucian-alexe-yh0UtueiZ-I-unsplash.jpg)

<!-- truncate -->

### Setup

First we need to install protocol buffer compiler. For installation instructions, see [Protocol Buffer Compiler Installation](https://grpc.io/docs/protoc-installation/)

We would also need to install protocol compiler plugins for Go using the following commands:

```sh
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
```

Update your **PATH** so that the **protoc** compiler can find the plugins

```sh
export PATH="$PATH:$(go env GOPATH)/bin"
```

### Generate gRPC code

Now, after initializing a project, we would create a folder that would contain our proto files. In our case lets name it **greeting**.

```sh
mkdir greeting && cd greeting && touch greeting.proto
```

Inside **greeting.proto** we would define the structure of required request, response and the functions.

```proto
syntax = "proto3";

option go_package = "github.com/Xebec19/probable-lamp/greeting";

package greeting;

service greetingService {
    rpc SayGreeting(GreetingRequest) returns (GreetingResponse) {}
}

message GreetingRequest{
    string name = 1;
}

message GreetingResponse {
    string message = 1;
}
```

In **greeting.proto** we have defined a service **greetingService** that would return a simple rpc method that takes a request and sends back a response.

Before we use the new service method, we need to compile the **.proto** file. Inside the root directory of the project, we would run the following command:

```sh
protoc --go_out=. --go_opt=paths=source_relative \
    --go-grpc_out=. --go-grpc_opt=paths=source_relative \
    greeting/greeting.proto
```

This will generate **greeting_grpc.pb.go** and **greeting.pb.go** files, which contain:

1. Code for populating, serializing and retrieving **GreetingRequest** and **GreetingResponse** message types.
2. Generated client and server code.

### Creating the server

Now we would create a **server** folder, which would contain code for the server. Open **server/main.go** and create a server and add methods to it.

```go
type server struct {
    ...
}

func (s *server) SayGreeting(ctx context.Context, in *pb.GreetingRequest) (*pb.GreetingResponse, error) {
	...
}
```

Lets create a simple rpc method **SayGreeting** that takes a name and returns a string.

```go
func (s *server) SayGreeting(ctx context.Context, in *pb.GreetingRequest) (*pb.GreetingResponse, error) {
	return &pb.GreetingResponse{Message: "Hello " + in.GetName()}, nil
}
```

Once, we have implemented all our methods, we would start our gRPC server on a given port.

```go
lis, err := net.Listen("tcp", ":50051")
if err != nil {
    log.Fatalf("failed to listen on port 50051: %v", err)
}

s := grpc.NewServer()
pb.RegisterGreetingServiceServer(s, &server{})

s.Serve(lis)
```

Finally, our server would look like below.

```go
package main

import (
	"context"
	"log"
	"net"

	pb "github.com/Xebec19/probable-lamp/greeting"
	"google.golang.org/grpc"
)

type server struct {
	pb.UnimplementedGreetingServiceServer
}

func (s *server) SayGreeting(ctx context.Context, in *pb.GreetingRequest) (*pb.GreetingResponse, error) {
	return &pb.GreetingResponse{Message: "Hello " + in.GetName()}, nil
}

func main() {
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen on port 50051: %v", err)
	}

	s := grpc.NewServer()
	pb.RegisterGreetingServiceServer(s, &server{})

    log.Printf("gRPC server listening at %v", lis.Addr())

    if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
```

In above code, we build a **server** that listens to port **:50051** and added a **SayGreeting** method to it, which accepts a name parameter and returns a string.

### Creating the client

In Go, we also call a client as stub. This client interacts with the server and invokes the RPC methods defined in the .proto file. Let&apos;s create a client/main.go file to implement the client.

The client first needs to establish a connection with the gRPC server.

```go
conn, err := grpc.NewClient("localhost:50051", grpc.WithTransportCredentials(insecure.NewCredentials()))
if err != nil {
	log.Fatalf("failed to connect to gRPC server at localhost:50051: %v", err)
}

defer conn.Close()
```

Using the connection, we initialize a client for the GreetingService:

```go
c := pb.NewHelloWorldServiceClient(conn)
```

To allow the client to accept the --name flag, we use Go's flag package. Here's how you can implement it:

```go
name := flag.String("name", "World", "Name to greet")
flag.Parse()
```

We then call the SayGreeting method, passing a GreetingRequest message:

```go
ctx, cancel := context.WithTimeout(context.Background(), time.Second)
defer cancel()

r, err := c.SayGreeting(ctx, &pb.GreetingRequest{Name: *name})
if err != nil {
	log.Fatalf("error calling function SayGreeting: %v", err)
}

log.Printf("Response from gRPC server's SayGreeting function: %s", r.GetMessage())
```

Here&apos;s the complete code for the client:

```go
package main

import (
	"context"
	"flag"
	"log"
	"time"

	pb "github.com/Xebec19/probable-lamp/greeting"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

var name = flag.String("name", "Default Name", "Name to greet")

func main() {

	flag.Parse()

	conn, err := grpc.NewClient("localhost:50051", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("failed to connect to gRPC server at localhost:50051: %v", err)
	}

	defer conn.Close()

	c := pb.NewGreetingServiceClient(conn)

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	r, err := c.SayGreeting(ctx, &pb.GreetingRequest{Name: *name})
	if err != nil {
		log.Fatalf("error calling function SayGreeting: %v", err)
	}

	log.Printf("Response from gRPC server's SayGreeting function: %s", r.GetMessage())
}
```

### Running the Client and Server

To test the setup:

1. Start the server using below command:

```sh
go run server/main.go
```

2. Start the client with the --name flag:

```sh
go run client/main.go --name=Rohan
```

3. The client will display the custom greeting message

```sh
2024/12/01 22:44:41 Response from gRPC server's SayGreeting function: Hello Rohan
```

This concludes our introduction to gRPC with Go. You&apos;ve successfully built a client-server application using gRPC!

[Source Code](https://github.com/Xebec19/probable-lamp)
