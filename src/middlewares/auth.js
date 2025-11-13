const adminAuth = (req,res, next) => {
   console.log("Admin auth is getting check");
   const token = "xyz";
   const isAdminAuthorised = token === "xyz";
   if(!isAdminAuthorised){
     res.status(401).send("unauthorised request");
   } else{
     next();
   }
};

const userAuth = (req,res,next) => {
   console.log("Admin auth is getting check");
   const token = "xyzfdhfhfshshhhsf";
   const isAdminAuthorised = token === "xyz";
   if(!isAdminAuthorised){
     res.status(401).send("unauthorised request");
   } else{
     next();
   }
};

module.exports = {
     adminAuth,
     userAuth
};