require('dotenv').config(); 
const mongoose = require("mongoose");
const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)

  .then((result) => {
    console.log("mongoDB Connected");
  })
  .catch((err) => {
    console.log(err, "Error occured in database connection");
  });
