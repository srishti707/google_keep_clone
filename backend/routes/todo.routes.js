const express=require('express');
const router=express.Router();
const {createTodo,getTodo,updateTodo,deleteTodo}=require('../controllers/todo.controller.js');
router.get("/get",getTodo);
router.post("/create",createTodo);
router.post("/update",updateTodo);
router.post("/delete",deleteTodo);
module.exports=router;