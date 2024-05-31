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





app.get("/", async (req, res) => {
  res.render('index.ejs');
});


app.listen(3000, () => {
  console.log("Listening on port 3000");
});








  