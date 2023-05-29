const jwt = require("jsonwebtoken");

let auth = {};

auth.authenticateUser = (req,res,next)=>{
    try
    {
        const token = req.headers.authorization.split(" ")[1];
        const key = process.env.JWT_KEY || "KEY";
        const verify = jwt.verify(token,key);
        next();
    }
    catch(err)
    {
        //console.log(err);
        res.status(404).json({"message":"Not Authenticated User"});
    }
}

module.exports = auth;