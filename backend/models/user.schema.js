const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator=require('validator');
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      // select:false,//removes password from query
    },
    passwordConfirm: {
      type: String,
      required: [true, "confirm password is required"],
      validate: {
        //this only works on save, so when updating password , please use save()
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords do not match",
      },
    },
    passwordResetToken:String,
    passwordResetTokenExpiration:Date,
 
},
  {
    timestamps: true, // creates createdAt and updatedAt fields automatically
  }
);

// hash the password before saving to the database
userSchema.pre("save", async function (next) {
  //1)check if the password is modified
  if (!this.isModified("password")) {
    next();
    //this refers to the password being saved.
  }
  //2) hash the password
  this.password = await bcrypt.hash(this.password, 12);
 this.passwordConfirm=undefined;
  next();
});
const User = mongoose.model("User", userSchema);
module.exports = User;
