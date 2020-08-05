const { DataTypes, Model } = require("sequelize");
const db = require("../db");
const SequelizeSlugify = require("sequelize-slugify");

class Collection extends Model {}

Collection.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
  }
);

SequelizeSlugify.slugifyModel(Collection, {
  source: ["name"],
});

module.exports = Collection;
