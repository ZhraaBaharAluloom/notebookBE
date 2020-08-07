//Data
const { Tag, Notebook } = require("../db/models");

exports.fetchTag = async (tagID, next) => {
  try {
    const tag = await Tag.findByPk(tagID);
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

