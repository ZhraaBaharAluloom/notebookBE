const express = require("express");

const router = express.Router();

const multer = require("multer");

const { listTag, fetchTag } = require("../controllers/tagController");

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

router.param("tagID", async (req, res, next, tagID) => {
  const tag = await fetchTag(tagID, next);
  if (tag) {
    req.tag = tag;
    next();
  } else {
    const err = new Error("Tag is not found");
    err.status = 404;
    next(err);
  }
});

//Tag List
router.get("/", listTag);

module.exports = router;
