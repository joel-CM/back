const { Sequelize } = require("sequelize");
// env
require("dotenv").config();
const { DB_USER, DB_PASS, DB_SERVER, DB_PORT, DB_NAME } = process.env;

// modelo de tablas
const modelClient = require("./src/models/Client.model");
const modelProduct = require("./src/models/Product.model");

// conexion
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASS}@${DB_SERVER}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false,
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

// creamos tablas
modelClient(sequelize);
modelProduct(sequelize);

// relaciones
const { Client, Product } = sequelize.models;

Client.belongsToMany(Product, { through: "shop" });
Product.belongsToMany(Client, { through: "shop" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
