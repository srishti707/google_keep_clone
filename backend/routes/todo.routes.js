const express=require('express');
const {protect}=require("../middlewares/protect.js")
const router=express.Router();
const {createTodo,getTodo,updateTodo,deleteTodo}=require('../controllers/todo.controller.js');
router.get("/get",protect,getTodo);
router.post("/create",protect,createTodo);
router.post("/update",protect,updateTodo);
router.post("/delete",protect,deleteTodo);
module.exports=router;