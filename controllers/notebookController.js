//Data
const { Notebook, Collection, Tag } = require("../db/models");


exports.fetchNotebook = async (notebookID, next) => {
  try {
    const notebook = await Notebook.findByPk(notebookID);
    return notebook;
  } catch (error) {
    next(error);
  }
};

exports.notebookList = async (req, res, next) => {
  try {
    const notebooks = await Notebook.findAll({
      attributes: { exclude: ["collectionId", "createdAt", "updatedAt"] },
      include: [
        {
          model: Collection,
          as: "collection",
          attributes: ["name"],
          
        },
       
        {
          model: Tag,
          as: "tag",
          attributes: ["name"],
        },
      ],
      // through: {
      //   model: NotebookTags,
      //   attributes: ["notebookID"]

      // },
    });

    res.json(notebooks);
  } catch (error) {
    next(error);
  }
};

exports.updateNotebook = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    await req.notebook.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.createTag = async (req, res, next) => {
  try {
    // req.body.notebookID = req.notebook.id;
    const newTag = await Tag.create(req.body);
    console.log(newTag);
    console.log("exports.createTag -> newTag", newTag)
    res.status(201).json(newTag);
  } catch (error) {
    next(error);
  }
};

exports.notebookDelete = async (req, res, next) => {
  try {
    await req.notebook.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
