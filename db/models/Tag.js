const { DataTypes, Model } = require("sequelize");
const db = require("../db");
const SequelizeSlugify = require("sequelize-slugify");

class Tags extends Model {}

Tags.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    sequelize: db,
  }
);

SequelizeSlugify.slugifyModel(Tags, {
  source: ["name"],
});

module.exports = Tags;
