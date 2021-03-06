const Notebook = require("./Notebook");
const Collection = require("./Collection");
const Tag = require("./Tag");

// a collection has many notebooks
Collection.hasMany(Notebook, {
  as: "notebooks",
  foreignKey: "collectionId",
  allowNull: false,
});

// Notebooks belong to one collection
Notebook.belongsTo(Collection, { as: "collection" });

// Notebook has many tags
Notebook.belongsToMany(Tag, {
  through: "NotebookTags",
  as: "tag",
  foreignKey: "notebookID",
});

// tags belong to many notebooks
Tag.belongsToMany(Notebook, {
  through: "NotebookTags",
  as: "notebook",
  foreignKey: "tagID",
});

module.exports = {
  Notebook,
  Collection,
  Tag,
};
