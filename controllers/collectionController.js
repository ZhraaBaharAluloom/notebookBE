//Data
const { Collection, Notebook } = require("../db/models");

exports.fetchCollection = async (collectionId, next) => {
  try {
    const collection = await Collection.findByPk(collectionId);
    return collection;
  } catch (error) {
    next(error);
  }
};

exports.listCollection = async (req, res, next) => {
  try {
    const collections = await Collection.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Notebook,
          as: "notebooks",
          attributes: ["id"],
        },
      ],
    });

    res.json(collections);
  } catch (error) {
    next(error);
  }
};

exports.createCollection = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    const newCollection = await Collection.create(req.body);
    res.status(201).json(newCollection);
  } catch (error) {
    next(error);
  }
};

exports.createNotebook = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }

    req.body.collectionId = req.collection.id;
    const newNotebook = await Notebook.create(req.body);
    res.status(201).json(newNotebook);
  } catch (error) {
    next(error);
  }
};



exports.updateCollection = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    await req.collection.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.deleteCollection = async (req, res, next) => {
  try {
    await req.collection.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
