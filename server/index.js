const grpc = require("grpc");
const { HelloProto } = require("../proto");

const server = new grpc.Server();

const sayHello = (call, callback) => {
  callback(null, { message: `Hello, ${call.request.name} from gRPC Server` });
};

server.addService(HelloProto.Greeter.service, { sayHello });
server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());

server.start();
