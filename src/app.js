const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");

const app = express();
app.use(express.json());

app.get("/user" , async (req,res) => {
     const userEmail = req.body.email;
     
     try{
          const user = await User.findOne();
          res.send(user);
          // const user = await User.find({ email: userEmail});
          // if(user.length === 0) {
          //      res.status(404).send("user not found");
          // }
          // else{
          //    res.send(user);
          // }
     }
     catch(err) {
          res.status(400).send("something went wrong");
     }
});

app.get("/feed", async (req,res) => {

     try{
         const user = await User.find({});
         res.send(user);
     }
     catch(err) {
          res.status(400).send("something went wrong");
     }
})

app.get("/feed", (req,res) => {});
app.post("/signup" , async (req,res)  => {
   
     const user = new User( req.body);

     try{
         await user.save();
         res.send("Data save succefully"); 
     }
     catch (err){
          res.status(400).send("Error saving the user"+ err.message);
     }

})

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
