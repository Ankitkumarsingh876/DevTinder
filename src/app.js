const express = require("express");

const app = express();


app.get("/user" , (req,res) => {
     res.send({firstName: "Ankit Kumar" , LastName: "singh"});
});

app.post ("/user", (req, res) => {
     res.send("Data succefully saved to the database");
})
app.delete("/user", (req,res) => {
     res.send("Delete the data");
})
// app.use("/test" , (req,res) => {
//      res.send("namaste node");
// });
// app.use("/hello" , (req,res) => {
//      res.send("namaste ");
// });
// app.use("/" , (req,res) => {
//      res.send("hello hello !");
// });


app.listen(7777, () => {
    console.log("server is succesfully listening 7777");
});