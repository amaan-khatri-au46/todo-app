const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require('cors');
const mongoose = require("mongoose");
// Importing Routes ... 
const todoItemRoute = require("./routes/todoItem.js");

dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(express.json());

// use Cors 
app.use(cors());

// Here We Had Connected ... 
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected To Mongo Db");
  } catch (error) {
    throw error;
  }
};


// Middleware So That We Can Use This 
app.use('/', todoItemRoute);


app.listen(PORT, () => {
  console.log("App Started");
  connect();
});
