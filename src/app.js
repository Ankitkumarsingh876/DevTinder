const express = require("express");

const app = express();

// app.use("/route", rh1, [rh2, rh3], rh4, rh5);
// if i put array all the route handler or some of the router eg: 2,3 ,
// then this will not effect on my resoponse or a code

app.use("/user", (req,res,next) => {
     console.log("handling route user1!!");
     // res.send("Response1!!");
     next()
}, 
    (req,res,next) => {
     console.log("handling route user2!!");
     // res.send("Response2!!");
     next()
},
  (req,res,next) => {
     console.log("handling route user3!!");
     // res.send("Response3!!");
     next()
},
  (req,res,next) => {
     console.log("handling route user4!!");
     // res.send("Response4!!");
     next()
},
  (req,res,next) => {
     console.log("handling route user5!!");
     // res.send("Response5!!");
     // next()
     // res.send("Response5!!");
}
);


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