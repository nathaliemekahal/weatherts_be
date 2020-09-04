const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./services/users");
const server = express();

server.use(express.json());
server.use(cors());
server.use("/users", userRoute);
dotenv.config();

mongoose
  .connect(process.env.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(
    server.listen(process.env.PORT, () => {
      console.log(`working on port ${process.env.PORT}`);
    })
  );
