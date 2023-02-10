import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import mongoose from "mongoose";
import {
  unauthorizedErrorHandler,
  badRequestErrorHandler,
  notFoundErrorHandler,
  genericErrorHandler,
} from "./errorHandlers.js";

const server = express();
const port = process.env.PORT || 3002;
//if process.env.PORT does not work, we will use 3001

//Middlewares
server.use(cors());
server.use(express.json());

//Endpoints

//ErrorHandlers
server.use(unauthorizedErrorHandler);
server.use(badRequestErrorHandler);
server.use(notFoundErrorHandler);
server.use(genericErrorHandler);

mongoose.set("strictQuery", false);
//We place this to set the strictQuery to false prior the update that is going to take place
mongoose.connect(process.env.MONGO_CONNECTION_STRING);
//It only takes one parameter, the connection string (URL) from Mongo

mongoose.connection.on("connected", () => {
  //Once the connection is done run the server
  console.log(`Connected to Mongo`);
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server running on Port: ${port}`);
  });
});
