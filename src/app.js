const express = require("express");
const connectDB = require("./config/database.js");

const app = express();

connectDB()
   .then(() => {
     console.log("Database connected succefully");
     app.listen(7777, () => {
     console.log("server is succesfully listening 7777");
     });
   })
   .catch((err) => {
      console.error("Database canot be connedted!!!");
   });
