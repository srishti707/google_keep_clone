const express=require('express');
const router=express.Router();
const {createUser,getUser,updateUser}=require('../controllers/user.controller.js');
router.get("/get",getUser);
router.post("/create",createUser);
router.post("/update",updateUser);
module.exports=router;