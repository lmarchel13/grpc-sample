const grpc = require("grpc");
const express = require("express");
const { HelloProto } = require("../proto");

const app = express();

const client = new HelloProto.Greeter(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

app.get("/:name", (req, res) => {
  const { name } = req.params;

  client.sayHello({ name }, (err, response) => {
    if (err) {
      console.error("Error:", err);
      return;
    }

    const { message } = response;
    console.log(`gRPC Response: ${message}`);
    res.send({ message });
  });
});

app.listen(3000, console.log("Server running at port 3000"));
