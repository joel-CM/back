const { Sequelize } = require("sequelize");
// env
require("dotenv").config();
const { DB_USER, DB_PASS, DB_SERVER, DB_PORT, DB_NAME } = process.env;

// modelo de tablas
const modelClient = require("./src/models/Client.model");
const modelProduct = require("./src/models/Product.model");

// conexion
const sequelize = new Sequelize({
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASS,
  host: DB_SERVER,
  port: DB_PORT,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false, // This line will fix new error
    },
  },
});

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
