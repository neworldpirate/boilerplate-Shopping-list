const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const items = require("./routes/api/items");
const path = require("path");

const app = express();

app.use(bodyParser.json());

const db = require("./config/key").mongoURL;

//Connect to mongo

mongoose.connect(
  db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("DB connected")
);

app.use("/api/items", items);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(5000, () => console.log("port on 5000"));
