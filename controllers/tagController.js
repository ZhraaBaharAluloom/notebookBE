//Data
const { Tag, Notebook } = require("../db/models");

exports.fetchTag = async (tagId, next) => {
  try {
    const tag = await Tag.findByPk(tagId);
    return tag;
  } catch (error) {
    next(error);
  }
};

exports.listTag = async (req, res, next) => {
  try {
    const tags = await Tag.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    //   include: [
    //     {
    //       model: Notebook,
    //       as: "notebooks",
    //       attributes: ["id"],
    //     },
    //   ],
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
