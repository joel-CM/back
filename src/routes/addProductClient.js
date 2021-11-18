const express = require("express");
const route = express.Router();
// models
const { Client, Product } = require("../../db");

// add products to client -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
route.post("/", async (req, res) => {
  const { client, products } = req.body;

  const name = await Client.findOne({ where: { name: client } });

  for (let i = 0; i < products.length; i++) {
    const idProduct = await Product.findAll({
      where: { name: products[i] },
      attributes: ["id"],
    });
    name.addProducts(idProduct[0]?.id);
  }
  res.json({ message: "products add success" });
});

module.exports = route;
