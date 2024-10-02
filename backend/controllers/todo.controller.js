const Todo = require("../models/todo.schema");
exports.createTodo = async (req, res) => {
  const { title, content,labels,background_color,pinned,completed,user_id, } = req.body;
  try {
    const newTodo = await Todo.create({title,content,labels,background_color,pinned,completed,user_id,});
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
  const { userId } = req.query;

  try {
    const todos = await Todo.find({ user_id: userId });
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
  const { todo_id } = req.body;
  if (!todo_id) {
    return res.status(400).json({
      success: false,
      message: "Todo_id is required",
    });
    // throw new Error("Todo_id is required");  //if you want to throw an error instead of returning a 400 status code.
  }
  try {
    const todos = await Todo.findByIdAndDelete({ user_id: userId });
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
  const {title,content,labels,background_color,pinned,completed,userId} = req.body;
  const { todo_id } = req.query;
  const updatedObject = {};
  if (title) {
    updatedObject.title = title;
  }
  if (labels) {
    updatedObject.labels = labels;
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
  if (content) {
    updatedObject.content = content;
  }
  if (userId) {
    updatedObject.user_id = userId;
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
