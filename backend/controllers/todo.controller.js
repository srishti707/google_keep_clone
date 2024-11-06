const Todo = require("../models/todo.schema");
const jwt=require("jsonwebtoken");
const User=require("../models/user.schema");
exports.createTodo = async (req, res) => {
  const { title, content,labels,background_color,pinned,completed } = req.body;
  const user_id=req.user._id;
  try {
    const newTodo = await Todo.create({title,content,labels,background_color,pinned,completed,user_id});
    return res.status(200).json({
      success: true,
      message: "Todo created successfully",
      data: newTodo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.getTodo = async (req, res) => {
  const {searchTitle } = req.query;
  const currentUser=req.user;
  const filterOptions={user_id:currentUser._id};
  if(searchTitle){
    filterOptions.title ={$regex:searchTitle,$options:"i"};
  }
  try {
    const todos = await Todo.find( filterOptions).sort({createdAt:-1});
    return res.status(200).json({
      success: true,
      message: "Todo fetched successfully",
      data: todos,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.deleteTodo = async (req, res) => {
  const { todo_id } = req.query;

  if (!todo_id) {
    return res.status(400).json({
      success: false,
      message: "Todo_id is required",
    });
    // throw new Error("Todo_id is required");  //if you want to throw an error instead of returning a 400 status code.
  }
  try {
    const todos = await Todo.findByIdAndDelete(todo_id);
    if (!todos) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
      // throw new Error("Todo not found");  //if you want to throw an error instead of returning a 404 status code.
    }
    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.updateTodo = async (req, res) => {
  const {title,content,labels,background_color,pinned,completed,userId,removeLabel} = req.body;
  console.log(req.body);
  const { todo_id } = req.query;
  const updatedObject = {};
  
  if (title!==null ||title!==undefined) {
    updatedObject.title = title;
  }
 
  if (background_color) {
    updatedObject.background_color = background_color;
  }
  if (completed) {
    updatedObject.completed = completed;
  }
  if (pinned) {
    updatedObject.pinned = pinned;
  }
  if (content!==null || content!==undefined) {
    updatedObject.content = content;
  }
  if (userId) {
    updatedObject.user_id = userId;
  }
  if(labels) {
    updatedObject.$push={labels:labels}
  }
  if(removeLabel){
   updatedObject.$pull={labels:removeLabel}
  }
  
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(todo_id, updatedObject, {new: true, });
    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
