const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db/db");
const path = require("path");

const { Notebook } = require("./db/models");

// Routes import
const notebookRouters = require("./routes/notebooks");
const collectionRoutes = require("./routes/collections");
const tagRoutes = require("./routes/tags");

const app = express();

app.use(cors());
app.use(bodyParser.json());

//Routers
app.use("/collections", collectionRoutes);
app.use("/notebooks", notebookRouters);
app.use("/tags", tagRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

//Not Found Paths
app.use((req, res, next) => {
  const error = new Error("Path not found");
  error.status = 404;
  next(error);
});

const run = async () => {
  try {
    await db.sync();
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
  await app.listen(8000, () => {
    console.log("This application is running on localhost:8000");
  });
};
run();
