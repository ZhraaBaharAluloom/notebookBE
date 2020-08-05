const Notebook = require("./Notebook");
const Collection = require("./Collection");

// a collection has many notebooks
Collection.hasMany(Notebook, {
  as: "notebooks",
  foreignKey: "collectionId",
  allowNull: false,
});

Notebook.belongsTo(Collection, { as: "collection" });

module.exports = {
  Notebook,
  Collection,
};
