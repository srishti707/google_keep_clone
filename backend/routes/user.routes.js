const express=require('express');
const router=express.Router();
const {createUser,getUser,updateUser, loginUser}=require('../controllers/user.controller.js');
router.get("/get",getUser);
router.post("/signup",createUser);
router.post("/login",loginUser);
router.post("/update",updateUser);
module.exports=router;