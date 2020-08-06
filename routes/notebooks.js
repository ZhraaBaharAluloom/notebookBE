const express = require("express");

const router = express.Router();

const multer = require("multer");

const {
  notebookList,
  updateNotebook,
  notebookDelete,
  fetchNotebook,
  createTag

} = require("../controllers/notebookController");

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

router.param("notebookID", async (req, res, next, notebookID) => {
  const notebook = await fetchNotebook(notebookID, next);
  if (notebook) {
    req.notebook = notebook;
    next();
  } else {
    const err = new Error("Notebook is not found");
    err.status = 404;
    next(err);
  }
});

//Notebook List
router.get("/", notebookList);

//Notebook Update
router.put("/:notebookID", upload.single("image"), updateNotebook);

// Create tag
router.post("/:notebookID/tags", upload.single("image"), createTag);


//Notebook Delete
router.delete("/:notebookID", notebookDelete);

module.exports = router;
