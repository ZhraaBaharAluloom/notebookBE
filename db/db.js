const { Sequelize } = require("sequelize");

const db = new Sequelize({
  username: "postgres",
  password: "HiamTheStar@95",
  database: "notebook",
  dialect: "postgres",
  host: "localhost",
  logging: false,
});

module.exports = db;
