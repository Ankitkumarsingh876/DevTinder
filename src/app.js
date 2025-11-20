const express = require("express");
const connectDB = require("./config/database.js");
const cookieParser = require("cookie-parser");
const app = express();


app.use(express.json());
app.use(cookieParser());

const authRouter = require("./Routers/auth.js");
const profileRouter = require("./Routers/profile.js");
const requestRouter = require("./Routers/request.js");
const userRouter = require("./Routers/user.js");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// app.delete("/user", async(req,res) =>{
//      const userId = req.body.userId;

//      try{
//          const user = await User.findByIdAndDelete(userId);
//          res.send("user deleted succefully");
//      }
//      catch(err) {
//           res.status(400).send("something went wrong");
//      }
// })

// app.patch("/user/:userId", async(req,res) => {
//      const userId = req.params?.userId;
//      const data = req.body ;
//      // delete data.userId;

//      try{
//           const ALLOWED_UPDATES =  ["photoURL","about","Gender","age", "skills",];
//           const isUpdateAllowed = Object.keys(data).every((k) =>
//           ALLOWED_UPDATES.includes(k));
//           if(!isUpdateAllowed){
//                throw new Error("update not allowed");
//           }
//           if(data.skills.length > 10){
//                throw new Error("skills not allowed more than 10");
//           }
//           const user = await User.findByIdAndUpdate({_id: userId}, data,{returnDocument: "after",
//                runValidators:true,});
//           console.log(user);
//           res.send("user updated succefully");
//      }catch(err) {
//          res.status(400).send("something went wrong "+ err.message);
//      }
// })

// app.get("/user" , async (req,res) => {
//      const userEmail = req.body._Id;
     
//      try{
//           const user = await User.findOne({_Id: userEmail});
//           res.send(user);
//           // const user = await User.find({ email: userEmail});
//           // if(user.length === 0) {
//           //      res.status(404).send("user not found");
//           // }
//           // else{
//           //    res.send(user);
//           // }
//      }
//      catch(err) {
//           res.status(400).send("something went wrong");
//      }
// });

// app.get("/feed", async (req,res) => {

//      try{
//          const user = await User.find({});
//          res.send(user);
//      }
//      catch(err) {
//           res.status(400).send("something went wrong");
//      }
// })

// app.get("/feed", (req,res) => {});



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
