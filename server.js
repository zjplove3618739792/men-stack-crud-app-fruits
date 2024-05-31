// server.js

const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");





// server.js

const app = express();

mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});



const Fruit = require("./models/fruit.js");
app.use(express.urlencoded({ extended: false }));







app.get("/", async (req, res) => {
  res.render('index.ejs');
});


app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
});


app.get("/fruits", (req, res) => {
  res.send("Welcome to the index page!");
});




app.post("/fruits", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  await Fruit.create(req.body);
  res.redirect("/fruits/new");
});





app.listen(3000, () => {
  console.log("Listening on port 3000");
});








  