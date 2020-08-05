const express = require("express");

const router = express.Router();

const multer = require("multer");


const {
    notebookList,
    updateNotebook,
    notebookDelete,
    fetchNotebook,
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
  
  router.param("notebookId", async (req, res, next, notebookId) => {
    const notebook = await fetchNotebook(notebookId, next);
    if (notebook) {
      req.notebook = notebook;
      next();
    } else {
      const err = new Error("Notebook is not found");
      err.status = 404;
      next(err);
    }
  });
  
  router.get("/", notebookList);
  
  router.put("/:notebookId", upload.single("image"), updateNotebook);
  
  router.delete("/:notebookId", notebookDelete);


module.exports = router;
