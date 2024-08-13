const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const loginRoutes = require("./routes/loginRoutes");
const userRoutes = require("./routes/signUpRoutes");
const adminRoutes = require("./routes/userRoutes");
const path = require("path");
const URL =
  "Copy and Paste your mongodb databaseurl link here";

const app = express();
app.use(express.json());

app.use(cors());

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(loginRoutes);
app.use("/admin", adminRoutes);
// app.use("/uploads", express.static(path.join(__dirname, "uploads"))); must need to use for save pictures, files and videos,etc from frontend to backend
mongoose
  .connect(URL)
  .then((result) => {
    app.listen(8080);//you can change this port according to you needs
    console.log('MongoDb is running a port on : 8080');
  })
  .catch((err) => {
    console.log(err);
  });
