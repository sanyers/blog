# node连接gRPC

## 1、安装依赖

`npm i @grpc/grpc-js`

## 2、创建协议 `helloworld.proto`

```
syntax = "proto3";

option java_multiple_files = true;
option java_package = "io.grpc.examples.helloworld";
option java_outer_classname = "HelloWorldProto";
option objc_class_prefix = "HLW";

package helloworld;

// The greeting service definition.
service Greeter {
  // Sends a greeting
  rpc SayHello (HelloRequest) returns (HelloReply) {}

  rpc SayHelloTest (HelloRequest) returns (HelloReply) {}

  rpc SayHelloStreamReply (HelloRequest) returns (stream HelloReply) {}
}

// The request message containing the user's name.
message HelloRequest {
  string name = 1;
}

// The response message containing the greetings
message HelloReply {
  string message = 1;
}
```

## 3、创建 `proto.js`

```js
const path = require('path')
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const PROTO_PATH = path.join(__dirname, 'chat.proto')
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true })
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)

const hello_proto = protoDescriptor.chat

module.exports = chat_proto
```

## 4、创建 `server.js`

```js
const grpc = require('@grpc/grpc-js')
const hello_proto = require('./proto')

let cnt = 1

function sayHello(call, callback) {
  callback(null, { message: `[${cnt++}] echo: ` + call.request.message })
}

function main() {
  var server = new grpc.Server()
  server.addService(hello_proto.Greeter.service, { sayHello: sayHello })
  server.bindAsync(
    '0.0.0.0:50051',
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start()
      console.log('grpc server started')
    },
  )
}

main()
```

## 5、创建 `client.js`

```js
const grpc = require('@grpc/grpc-js')
const hello_proto = require('./proto')

const ip = 'localhost:50051'
function main() {
  const client = new hello_proto.Greeter(ip, grpc.credentials.createInsecure())
  client.say({message: 'test'}, function(err, response) {
    console.log(response);
  });
}

main()
```

[grpc文档](https://grpc.io/)