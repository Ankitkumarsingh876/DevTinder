const express = require("express");

const app = express();

const {adminAuth,userAuth } = require("./middlewares/auth");

// app.use("/route", rh1, [rh2, rh3], rh4, rh5);
// if i put array all the route handler or some of the router eg: 2,3 ,
// then this will not effect on my resoponse or a code

app.use("/Admin" , adminAuth);

app.get("/user", userAuth, (req,res) => {
     res.send("User data send");
});

app.post("/user/login", (req,res) => {
     res.send("User login succefully");
});

app.get("/Admin/getAllData", (req,res) =>{
     res.send("All data send");
});


// app.use("/user", (req,res,next) => {
//      console.log("handling route user1!!");
//      // res.send("Response1!!");
//      next()
// }); 
// app.use("/user", (req,res,next) => {
//      console.log("handling route user1!!");
//      // res.send("Response2!!");
//      next()
// }); 
   


// app.get("/user/:userID/:name/:password" , (req,res) => {
//      console.log(req.params);
//      res.send({firstName: "Ankit Kumar" , LastName: "singh"});
// });
// app.get("/user/" , (req,res) => {
//      console.log(req.query);
//      res.send({firstName: "Ankit Kumar" , LastName: "singh"});
// });
// app.get("/a/" , (req,res) => {
//      // console.log(req.query);
//      res.send({firstName: "Ankit Kumar" , LastName: "singh"});
// });
// app.get("/a/" , (req,res) => {
//      // console.log(req.query);
//      res.send({firstName: "Ankit Kumar" , LastName: "singh"});
// });app.get("/a/" , (req,res) => {
//      // console.log(req.query);
//      res.send({firstName: "Ankit Kumar" , LastName: "singh"});
// });

// app.get("/ab?c" , (req,res) => {
//      // console.log(req.query);
//      res.send({ LastName: "singh"});
// });

// app.get("/ab+c" , (req,res) => {
//      // console.log(req.query);
//      res.send({ LastName: "singh"});
// });
// app.get("/ab*cd" , (req,res) => {
//      // console.log(req.query);
//      res.send({ LastName: "singh"});
// });
// app.get("/a(bc)?d" , (req,res) => {
//      // console.log(req.query);
//      res.send({ LastName: "singh"});
// });
// app.get("/a(bc)+d" , (req,res) => {
//      // console.log(req.query);
//      res.send({ LastName: "singh"});
// });
// app.get("/a/" , (req,res) => {
//      // console.log(req.query);
//      res.send({ LastName: "singh"});
// });
// app.get("/./" , (req,res) => {
//      // console.log(req.query);
//      res.send({ LastName: "singh"});
// });
// app.get(/.*fly$/ , (req,res) => {
//      // console.log(req.query);
//      res.send({ LastName: "singh"});
// });
// app.post ("/user", (req, res) => {
//      res.send("Data succefully saved to the database");
// })
// app.delete("/user", (req,res) => {
//      res.send("Delete the data");
// })
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