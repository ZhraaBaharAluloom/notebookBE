//Data
const { Notebook, Collection } = require("../db/models");

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
      ],
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

exports.notebookDelete = async (req, res, next) => {
  try {
    await req.notebook.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
