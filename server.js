// server.js

const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const methodOverride = require("method-override"); // new
const morgan = require("morgan"); 





mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});



const Fruit = require("./models/fruit.js");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new







app.get("/", async (req, res) => {
  res.render('index.ejs');
});


app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
});


app.get("/fruits/:fruitId", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/show.ejs", { fruit: foundFruit });
});



app.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find();
  res.render("fruits/index.ejs", { fruits: allFruits });
});




app.post("/fruits", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  await Fruit.create(req.body);
  res.redirect("/fruits"); 
});





app.delete("/fruits/:fruitId", async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId);
  res.redirect("/fruits");
});


app.listen(3000, () => {
  console.log("Listening on port 3000");
});








  