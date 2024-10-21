const jwt=require('jsonwebtoken');
const User=require("../models/user.schema");
exports.protect=async (req,res,next)=>{
    
  let token;
  console.log(req.headers.authorization);
  if(req.headers.authorization &&req.headers.authorization.startsWith("Bearer")){
    token=req.headers.authorization.split(" ")[1];//split breaks to an array["bearer","token"]
      
  }
  if(!token){
    return res.status(400).json({
      success: false,
      message: "you're not logged in.Login to access.",
    });

    // throw new Error("Token is required");  //if you want to throw an error instead of returning a 401 status code.
  }
  const decodedToken=jwt.verify(token,process.env.JWT_SECRET); //gives payload.
  const currentUser=await User.findById(decodedToken.id);//through payload.id we find the user.
  if(!currentUser){
    return res.status(401).json({
      success: false,
      message: "Invalid token or user doesnot exist",
    });
    // throw new Error("Invalid token");  //if you want to throw an error instead of returning a 401 status code.
  }
  req.user=currentUser;
  next();
}