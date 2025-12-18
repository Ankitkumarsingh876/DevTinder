const express = require("express");
const {validateSignupData} = require("../utils/validation.js");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
// const jwt  = require("jsonwebtoken");

authRouter.post("/signup" , async (req,res)  => {

     try{
     validateSignupData(req);

     const {firstName, lastName, email, password} = req.body;

     const passwordHash = await bcrypt.hash(password,10);
     console.log(passwordHash);
     
     const user = new User( {firstName, lastName, email, password: passwordHash});

     
        const savedUser = await user.save();
        const token = await savedUser.getJWT(); 

        res.cookie("token", token,{
            httpOnly: true,
            secure: true,
            sameSite: "none",          
          expires: new Date(Date.now() + 8 * 3600000)});  
         
         res.json({message: "Data save succefully", data:savedUser}); 
     }
     catch (err){
          res.status(400).send("ERROR "+ err.message);
     }

})
authRouter.post("/login", async(req,res) => {

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

              res.cookie("token", token,{
                httpOnly: true,
                secure: true,
                sameSite: "none",               
               expires: new Date(Date.now() + 8 * 3600000)}); 
              res.send(user);
          }
          else{
               throw new Error("Invalid credential");
          }


     }
     catch(err){
          res.status(400).send("Something went wrong"+ err.message);
     }
})

authRouter.post("/logout", async (req,res) => {
    res.cookie("token", null, { 
      httpOnly: true,
      secure: true,
      sameSite: "none",     
     expires: new Date(Date.now())},)

        res.send("logout succefully!!");
});

module.exports = authRouter;