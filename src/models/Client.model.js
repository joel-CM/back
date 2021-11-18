const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Client", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
};
