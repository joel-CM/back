const { conn } = require("./db");
const app = require("./src/app");

const port = process.env.PORT || 3001;

conn
  .sync()
  .then((res) => {
    app.listen(port, () => {
      console.log("db is running!");
    });
  })
  .catch((err) => {
    console.log(err);
  });
