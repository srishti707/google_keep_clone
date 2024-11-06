const User = require("../models/user.schema");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const {randomBytes,createHash}=require("crypto");

exports.getUser = async (req, res) => {
  //to get data of an individual user using user_id.
  try {
    const { userId } = req.query;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: user,
      message: "User fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.createUser = async (req, res) => {
  //to create a new user.
  const { name, email, password,passwordConfirm } = req.body;
  try {
    if(!name|| !email|| !password || !passwordConfirm){
      return res.status(400).json({
        success:false,
        message:"All fields are required"
      })
    }
    //1)if user already exists
    const userExists=await User.findOne({email});
    if(userExists){
     return res.status(403).json({
       success:false,
       message:"User already exists",
    
     }) 

    }
    const newUser = await User.create({ name, email, password ,passwordConfirm});
    const payload={
      id:newUser._id,
      name:newUser.name,
      email:newUser.email
    }
    const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
    return res.status(200).json({
      success: true,
      data: newUser,
      token,
      message: "User created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.loginUser=async(req,res)=>{
  try{

    const {email,password}=req.body;
    const userExists=await User.findOne({email});
    if(!userExists){
      return res.status(401).json({
        success:false,
        message:"User not found"
      })
    }
      const isPasswordMatch=await bcrypt.compare(password,userExists.password)
      if(!isPasswordMatch){
        return res.status(401).json({
          success:false,
          message:"Incorrect password"
        })
      }
      const payload={
        id:userExists._id,
        name:userExists.name,
        email:userExists.email
      }
      const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
      return res.status(200).json({
        success: true,
        data: userExists,
        token,
        message: "User logged in successfully",
      });
  }
  catch(err){
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}
exports.forgotPassword=async(req,res)=>{
  const {email}=req.body;
  const userExists=await User.findOne({email});
  try{
    if(!userExists){
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
   //generate a random token
   const resetToken=randomBytes(32).toString("hex");
    //store this token in database with user id and expiry date after hashing
    const hashedToken=createHash("sha256").update(resetToken).digest("hex");
    userExists.passwordResetToken=hashedToken;
    userExists.passwordResetTokenExpiration=Date.now()+10*60*1000;//in milliseconds
    await userExists.save({validateBeforeSave: false});
    const resetUrl=`${req.protocol}://${req.host}/user/resetPassword/${hashedToken}`;
    //send email using email service provider
    res.status(200).json({
      success: true,
      message: "Reset password link sent to your email",
      data: resetUrl,
    })

  }
  catch(err){
    userExists.passwordResetToken=undefined ;
    userExists.passwordResetTokenExpiration=undefined ;
    userExists.save({
      validationBeforeSave:false
    })
        return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}
exports.updateUser = async (req, res) => {

  const { userId } = req.query;

  const { name, email, password } = req.body;
  try{
    const updateObj = {};
    if (name) updateObj.name = name;
    if (email) updateObj.email = email;
    if (password) updateObj.password = password;
    const updatedData = await User.findByIdAndUpdate(userId, updateObj, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      data: updatedData,
      message: "User updated successfully",
    });
  }
  catch(err){
    return res.status(500).json({
      success:false,
      message:err.message
    })
  }
 
};
