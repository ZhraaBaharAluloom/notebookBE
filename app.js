const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db/db");
const path = require("path");


// Routes import
const notebookRouters = require("./routes/notebooks");
const collectionRoutes = require("./routes/collections");


const app = express();
app.use(cors());
app.use(bodyParser.json());

//Routers
app.use("/collections", collectionRoutes);
app.use("/notebooks", notebookRouters);
app.use("/media", express.static(path.join(__dirname, "media")));

const run = async () => {
    try {
      await db.authenticate();
      console.log("Connection to the database successful!");
    } catch (error) {
      console.error("Error connecting to the database: ", error);
    }
    await app.listen(8000, () => {
      console.log("This application is running on localhost:8000");
    });
  };
  run();