const express = require("express");

const router = express.Router();

const multer = require("multer");

const {
  createCollection,
  createNotebook,
  listCollection,
  updateCollection,
  deleteCollection,
  fetchCollection,
} = require("../controllers/collectionController");

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

router.param("collectionId", async (req, res, next, collectionId) => {
  const collection = await fetchCollection(collectionId, next);
  if (collection) {
    req.collection = collection;
    next();
  } else {
    const err = new Error("Collection is not found");
    err.status = 404;
    next(err);
  }
});

//Collection List
router.get("/", listCollection);

//Collection Create
router.post("/", upload.single("image"), createCollection);

//Notebook Create
router.post("/:collectionId/notebooks", upload.single("image"), createNotebook);

//Collection Update
router.put("/:collectionId", upload.single("image"), updateCollection);

//Collection Delete
router.delete("/:collectionId", deleteCollection);

module.exports = router;
