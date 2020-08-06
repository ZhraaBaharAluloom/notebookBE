//Data
const { Tag, Notebook } = require("../db/models");
const { notebookDelete } = require("./notebookController");

exports.fetchTag = async (tagID, next) => {
  try {
    const tag = await Tag.findByPk(tagID, {
      include: [
        {
          model: Notebook,
          as: "notebook",
          attributes: ["name", "id"],
        },
      ],
    });
    return tag;
  } catch (error) {
    next(error);
  }
};

exports.listTag = async (req, res, next) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Notebook,
          as: "notebook",
          attributes: ["name"],
        },
      ],
    });

    res.json(tags);
  } catch (error) {
    next(error);
  }
};

// exports.deleteTag = async (req, res, next) => {
//   try {
//     await req.tag.destroy();
//     res.status(204).end();
//   } catch (error) {
//     next(error);
//   }
// };
