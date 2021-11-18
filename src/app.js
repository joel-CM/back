const express = require("express");
const morgan = require("morgan");
const app = express();
// <----------impport routs---------->
const routeClients = require("./routes/clients.route");
const routeProducts = require("./routes/product.route");
const addProductClient = require("./routes/addProductClient");

// <----------middlewares---------->
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// routs -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
app.use("/api/clients", routeClients);
app.use("/api/products", routeProducts);
app.use("/api/add", addProductClient);

module.exports = app;
