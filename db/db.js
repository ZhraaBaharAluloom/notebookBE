const { Sequelize } = require("sequelize");

const db = new Sequelize({
  username: "postgres",
  password: "Munirali1",
  database: "notebook",
  dialect: "postgres",
  host: "localhost",
  logging: false,
});

module.exports = db;
