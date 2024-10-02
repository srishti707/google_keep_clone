const User = require("../models/user.schema");

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
  const { name, email, password } = req.body;
  try {
    if(!name|| !email|| !password){
      return res.status(400).json({
        success:false,
        message:"All fields are required"
      })
    }
    const newUser = await User.create({ name, email, password });
    return res.status(200).json({
      success: true,
      data: newUser,
      message: "User created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
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
