const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
// <----------impport routs---------->
const routeClients = require("./routes/clients.route");
const routeProducts = require("./routes/product.route");
const addProductClient = require("./routes/addProductClient");

// <----------middlewares---------->
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routs -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
app.use("/api/clients", routeClients);
app.use("/api/products", routeProducts);
app.use("/api/add", addProductClient);

module.exports = app;
