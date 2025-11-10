const express = require("express");

const app = express();

app.get("/" , (req,res) => {
     res.send("hello hello !");
});
app.get("/test" , (req,res) => {
     res.send("namaste node");
});
app.get("/hello" , (req,res) => {
     res.send("namaste ");
});


app.listen(7777, () => {
    console.log("server is succesfully listening 7777");
});