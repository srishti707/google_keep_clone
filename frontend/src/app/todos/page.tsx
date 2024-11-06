"use client";

import { create_todo } from "@/constants";
import TodoContext from "@/context/TodoContext";
import {
  createTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from "@/networks/todo_networks";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { IoIosCheckboxOutline, IoIosColorPalette } from "react-icons/io";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { DotLoader } from "react-spinners";

function page() {
  const [clickInput, setClickInput] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [hovered, setHovered] = useState<number>(-1);
  const [showDropDown, setDropDown] = useState<number>(-1);
  const [showLabel, setshowLabel] = useState<number>(-1);
  const [labelName, setLabelName] = useState<string>("");
  const [removeLabel, setRemoveLabel] = useState<string>("");
  const [showCross, setShowCross] = useState<string>("");
  const [editTitle, setEditTitle] = useState<string>("");
  const [editedTitle, setEditedTitle] = useState<string| null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const [editedContent, setEditedContent] = useState<string| null>(null);

  const colorRef = useRef<HTMLInputElement>(null);
  
  const {getTodos,allTodos,loading}=useContext(TodoContext)

  
  async function handleAddTodo() {

    const body:any = {
      title,
      content,
    };
    // setLoading(true);
    const res: any = await createTodo(body); //res=response.data

    if (res.success) {
      console.log("todo added successfully");
      setTitle("");
      setContent("");
      getTodos();
    } else {
      console.log("error in adding todo");
    }
    // setLoading(false);
  }
  async function handleDeleteTodo(id: string) {
    const res = await deleteTodo({ todo_id: id });
    if (res.success) {
      getTodos();
    }
  }
  async function handleUpdateTodo(todo_id: string) {
    const params = {
      todo_id,
      body: {
        labels: labelName,
        title:editedTitle,
        content:editedContent
      
      },
    };
    const response = await updateTodo(params);
    setshowLabel(-1);
    setEditTitle("");
    setEditContent("");
    setDropDown(-1);
    if (response.success) {
      getTodos();
    }

  }
  async function removeLabell(todo_id:string,label:string){
const params={
  todo_id,
  body:{
  removeLabel:label
  },

}
const response=await updateTodo(params);
if(response.success){

  getTodos();
}
  }

  // async function createTodo(){
  //  const body={
  //    title,
  //    content,
  //    user_id:"66fbd05f8ab56098a7c329b3"
  //  }
  //  const response=axios.post("http://localhost:6969/todo/create",body)
  // }

  return (
    <div className=" flex flex-col  bg-gray-900 flex-1">
      <div className=" flex bg-gray-900 w-full  justify-center h-fit p-4">
        <div className="flex bg-gray-900 justify-center items-center border w-[60%] rounded-lg border-white px-2 gap-5 ">
          {!clickInput ? (
            <input
              className="text-white flex-1  w-[50%] p-5 rounded-md bg-gray-900 outline-none"
              placeholder="Take a note..."
              onClick={() => setClickInput(true)}
            />
          ) : (
            <div className="flex flex-col text-white w-full py-2 ">
              <input
                className="bg-transparent text-white w-full px-5 py-3 outline-none"
                placeholder="Enter title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <input
                className="bg-transparent text-white w-full px-5 py-4 outline-none"
                placeholder="Take a note..."
                onChange={(e) => setContent(e.target.value)}
                value={content}
              />
              <div className="flex gap-3 self-end">
                <button
                  onClick={() => setClickInput(false)}
                  className="text-white p-2 rounded-md border-blue-400 bg-blue-100 bg-opacity-30"
                >
                  Close
                </button>
                <button
                  onClick={handleAddTodo}
                  className="text-white p-2 rounded-md border-blue-400 bg-blue-100 bg-opacity-30"
                >
                  Add
                </button>
              </div>
            </div>
          )}
          <IoIosCheckboxOutline className="text-2xl text-white" />
          <HiOutlinePaintBrush className="text-white text-2xl" />
          <MdOutlinePhotoSizeSelectActual className="text-white text-2xl" />
        </div>
      </div>
      {loading && (
        <div className="h-full w-full flex justify-center items-center ">
          <DotLoader size={50} color="#FFFFFF" />
        </div>
      )}
      <div className="text-white p-4 max-w-full gap-3 columns-4 min-h-screen">
        {!loading &&    allTodos &&
          allTodos.map((todo: any) => {
            return (
              <div
                onMouseOver={() => setHovered(todo._id)}
                className="flex flex-col gap-2 border-2 mb-3 w-full  border-white p-2 break-inside-avoid rounded-lg  "
              >
                
          
                <h1 
                className="text-xl font-bold">{todo.title}</h1>
                
                <div className="flex gap-2 flex-wrap">
                  {todo.labels.map((label: any,index:number) => (
                    <p
                      className="p-2 rounded-md border-blue-400 bg-blue-100 bg-opacity-30 "
                      onMouseOver={() => setShowCross(`${todo._id}${index}`)}
                      onMouseOut={()=>setShowCross("")}
                    >
                      {label}
                      {showCross===`${todo._id}${index}` &&
                        <button
                          onClick={() =>removeLabell(todo._id,label)}
                          className="bg-red-500 text-white p-3 rounded-md"
                        >
                          X
                        </button>
                      }
                    </p>
                  ))}
                </div>
                <p className="break-all">{todo.content}</p>
                {hovered === todo._id && (
                  <div className="flex items-center justify-end gap-3 text-2xl">
                    <label>
                      <input ref={colorRef} type="color" className="hidden" />
                      <button
                        onClick={() => colorRef.current?.click()}
                        className="h-10 w-10 rounded-full hover:bg-gray-500 flex justify-center items-center"
                      >
                        <IoIosColorPalette />
                      </button>
                    </label>
                    <div className="relative ">
                      <button
                        onClick={() => setDropDown(todo._id)}
                        className="h-10 w-10 rounded-full hover:bg-gray-500 flex justify-center items-center"
                      >
                        {" "}
                        <BsThreeDotsVertical />
                      </button>
                      {showDropDown === todo._id && (
                        <ul className="p-3 h-32 bg-gray-600 rounded-md text-sm absolute top-[100%] right-0 flex flex-col justify-center gap-4 items-center">
                          <li
                            onClick={() => handleDeleteTodo(todo._id)}
                            className="whitespace-nowrap cursor-pointer"
                          >
                            delete
                          </li>
                          <li
                            onClick={() => {
                              setshowLabel(todo._id);
                              setDropDown(-1);
                              setEditedTitle(todo.title);
                              setEditedContent(todo.content)
                            }}

                            className="whitespace-nowrap cursor-pointer"
                          >
                            Add label
                          </li>
                        
                          <li  onClick={()=>{
                            setEditedTitle(todo.title)
                            setEditTitle(todo._id)
                            setLabelName("")
                          }}
                            
                           className="whitespace-nowrap cursor-pointer">edit Title</li>
                        
                          <li onClick={()=>{
                            setEditedContent(todo.content)
                            setEditedTitle(todo.title);
                            setEditContent(todo._id);
                            setLabelName("");
                            
                          }}
                          className="whitespace-nowrap cursor-pointer">edit Note</li>
                        </ul>
                      )}
                      {showLabel === todo._id && (
                        <ul className="p-3 h-32 bg-gray-600 rounded-md text-sm absolute top-[100%] right-0 flex flex-col justify-center gap-4 items-center">
                          <input
                            onChange={(e) => setLabelName(e.target.value)}
                            value={labelName}
                            className="p-4 m-4 bg-transparent text-white "
                            placeholder="add label...."
                          />
                          <button
                            onClick={() => {
                              handleUpdateTodo(todo._id);
                            }}
                            className="whitespace-nowrap cursor-pointer"
                          >
                            Add label
                          </button>
                        </ul>
                      )}
                      { editTitle===todo._id  && (
                        <ul className="p-3 h-32 bg-gray-600 rounded-md text-sm absolute top-[100%] right-0 flex flex-col justify-center gap-4 items-center">
                          <input
                            onChange={(e) => setEditedTitle(e.target.value)}
                            value={editedTitle||""}
                            className="p-4 m-4 bg-transparent text-white "
                            placeholder="edit Title...."
                          />
                          <button
                            onClick={() => {
                              handleUpdateTodo(todo._id);
                            }}
                            className="whitespace-nowrap cursor-pointer"
                          >
                           Update Title
                          </button>
                        </ul>
                      )}
                      { editContent===todo._id  && (
                        <ul className="p-3 h-32 bg-gray-600 rounded-md text-sm absolute top-[100%] right-0 flex flex-col justify-center gap-4 items-center">
                          <input
                            onChange={(e) => setEditedContent(e.target.value)}
                            value={editedContent||""}
                            className="p-4 m-4 bg-transparent text-white "
                            placeholder="edit content...."
                          />
                          <button
                            onClick={() => {
                              handleUpdateTodo(todo._id);
                            }}
                            className="whitespace-nowrap cursor-pointer"
                          >
                           Update Note...
                          </button>
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default page;
