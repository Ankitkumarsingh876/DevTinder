const express = require('express');
const {userAuth} = require("../middlewares/auth.js");
const requestRouter = express.Router();

requestRouter.post("/conncectionRequest",userAuth, async(req,res) => {
     
     const user = req.user;
     res.send(user.firstName +" sent a connetion");
})

module.exports = requestRouter;