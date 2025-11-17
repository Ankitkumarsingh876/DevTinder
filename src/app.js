const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
const {validateSignupData} = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt  = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth.js");

const app = express();

app.use(express.json());
app.use(cookieParser());


app.delete("/user", async(req,res) =>{
     const userId = req.body.userId;

     try{
         const user = await User.findByIdAndDelete(userId);
         res.send("user deleted succefully");
     }
     catch(err) {
          res.status(400).send("something went wrong");
     }
})

app.patch("/user/:userId", async(req,res) => {
     const userId = req.params?.userId;
     const data = req.body ;
     // delete data.userId;

     try{
          const ALLOWED_UPDATES =  ["photoURL","about","Gender","age", "skills",];
          const isUpdateAllowed = Object.keys(data).every((k) =>
          ALLOWED_UPDATES.includes(k));
          if(!isUpdateAllowed){
               throw new Error("update not allowed");
          }
          if(data.skills.length > 10){
               throw new Error("skills not allowed more than 10");
          }
          const user = await User.findByIdAndUpdate({_id: userId}, data,{returnDocument: "after",
               runValidators:true,});
          console.log(user);
          res.send("user updated succefully");
     }catch(err) {
         res.status(400).send("something went wrong "+ err.message);
     }
})

app.get("/user" , async (req,res) => {
     const userEmail = req.body._Id;
     
     try{
          const user = await User.findOne({_Id: userEmail});
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

     try{
     validateSignupData(req);

     const {firstName, lastName, email, password} = req.body;

     const passwordHash = await bcrypt.hash(password,10);
     console.log(passwordHash);
     
     const user = new User( {firstName, lastName, email, password: passwordHash});

     
         await user.save();
         res.send("Data save succefully"); 
     }
     catch (err){
          res.status(400).send("ERROR "+ err.message);
     }

})

app.get("/profile", userAuth, async( req,res) => {
    try {

     const user = req.user;
     res.send(user);}
     catch(err){
          res.status(400).send("Something went wrong"+ err.message);
     }
})

app.post("/login", async(req,res) => {

     try{
          const {email, password} = req.body;

          const user = await User.findOne({email: email});

          if(!user){
               throw new Error("invalid credential");
          }

          const isPasswordValid = await user.validatePassword(password);

          if(isPasswordValid){

               const token = await user.getJWT(); 
               // console.log(token);

              res.cookie("token", token,{expires: new Date(Date.now() + 8 * 3600000)}); 
              res.send("Login succfully")
          }
          else{
               throw new Error("Invalid credential");
          }


     }
     catch(err){
          res.status(400).send("Something went wrong"+ err.message);
     }
})

app.post("/conncectionRequest",userAuth, async(req,res) => {
     
     const user = req.user;
     res.send(user.firstName +" sent a connetion");
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
