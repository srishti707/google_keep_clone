
const express=require('express');
const todoRoutes=require("./routes/todo.routes");
const userRoutes=require("./routes/user.routes");  
const app=express();
app.use(express.json());
app.use("/user",userRoutes);
app.use("/todo",todoRoutes);
module.exports=app;