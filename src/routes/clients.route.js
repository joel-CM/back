const express = require("express");
const route = express.Router();
// model client
const { Client, Product } = require("../../db");

// get all client -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
route.get("/", async (req, res) => {
  const client_db = await Client.findAll({
    include: {
      model: Product,
    },
  });

  const clients = client_db.map((c) => {
    return {
      id: c.id,
      name: c.name,
      products: c.Products?.map((p) => {
        return {
          name: p.name,
          price: p.price,
        };
      }),
    };
  });
  res.json(clients);
});

// get one client -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
route.get("/:id", async (req, res) => {
  const { id } = req.params;

  !Number.isInteger(parseInt(id)) &&
    res.status(500).json({ message: "params not valid!" });

  try {
    const searchClient = await Client.findByPk(id);
    if (searchClient) {
      res.status(200).json(searchClient);
    } else {
      res.status(404).json({ message: "client not found!" });
    }
  } catch (err) {
    console.log(err);
  }
});

// create a new client -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
route.post("/", async (req, res) => {
  const { name, client, products } = req.body;
  await Client.create({ name });
  res.json({ message: `client ${name} created!` });
});

// update client -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
route.put("/:id", async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    const searchClient = await Client.findOne({ where: { id } });
    if (searchClient) {
      await Client.update({ name }, { where: { id } });
      return res
        .status(200)
        .json({ message: `client ${searchClient.name} updated to ${name}!` });
    } else {
      return res.status(404).json({ message: "client not found!" });
    }
  } catch (err) {
    console.log(err);
  }
});

route.get("/", async (req, res) => {
  console.log(object);
});

// delete client -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
route.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const client = await Client.findByPk(id);
    if (client) {
      await Client.destroy({ where: { id } });
      return res
        .status(200)
        .json({ message: `client ${client.name} deleted!` });
    } else {
      return res.status(404).json({ message: "client not found!" });
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = route;
