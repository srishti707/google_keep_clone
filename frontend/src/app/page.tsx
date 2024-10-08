"use client";

import { fetchTodos } from "@/networks/todo_networks";
import { useEffect, useState } from "react";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { IoIosCheckboxOutline } from "react-icons/io";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";

function page() {
  // const [allTodos, setAllTodos] = useState([]);
  // useEffect(() => {
  //   getTodos();
  // }, []);
  // async function getTodos() {
  //   const response = await fetchTodos({});
  //   console.log("response------->", response);
  //   if (response.success) {
  //     setAllTodos(response.data);
  //   } else {
  //     console.log("error in fetching todos.");
  //   }
  // }
  let allTodos = [
    {
      title:"grocery shopping",
      labels: ["important", "urgent"],
      content: "Buy milk, eggs, bread, butter, cheese, and apples.",
    },
    {
      title:"clean the house",
      labels: ["important"],
      content: "Clean the kitchen, living room, and bathroom.",
    },{
      title:"take a shower",
      labels: ["important"],
      content: "Wash the dishes, wipe the kitchen floor, and wash the bathroom.",
    },{
      title:"take a nap",
      labels: ["important"],
      content: "Take a 15-minute nap.",
    },{
      title:"workout",
      labels: ["important"],
      content: "Do 30 minutes of yoga, 15 minutes of cardio, and 15 minutes of strength training.Do 30 minutes of yoga, 15 minutes of cardio, and 15 minutes of strength training.Do 30 minutes of yoga, 15 minutes of cardio, and 15 minutes of strength training.",
    },{
      title:"read a book",
      labels: ["important"],
      content: "Read a 150-page book.",
    },{
      title:"make dinner",
      labels: ["important"],
      content: "Cook a healthy meal with 3 ingredients.",
    },{
      title:"make a presentation",
      labels: ["important"],
      content: "Prepare a 30-minute presentation on a topic of your choice.",
    },{
      title:"exercise",
      labels: ["important"],
      content: "Do 30 minutes of yoga, 15 minutes of cardio, and 15 minutes of strength training.",
    },{
      title:"workout",
      labels: ["important"],
      content: "Do 30 minutes of yoga, 15 minutes of cardio, and 15 minutes of strength training.Do 30 minutes of yoga, 15 minutes of cardio, and 15 minutes of strength training.Do 30 minutes of yoga, 15 minutes of cardio, and 15 minutes of strength training.",
    },{
      title:"read a book",
      labels: ["important"],
      content: "Read a 150-page book.",
    },{
      title:"make dinner",
      labels: ["important"],
      content: "Cook a healthy meal with 3 ingredients.",
    },{
      title:"make a presentation",
      labels: ["important"],
      content: "Prepare a 30-minute presentation on a topic of your choice.",
    },{
      title:"exercise",
      labels: ["important"],
      content: "Do 30 minutes of yoga, 15 minutes of cardio, and 15 minutes of strength training.",
    }
  ]
  return (
    <div className="flex-1 flex flex-col  bg-gray-900">
      <div className=" flex bg-gray-900 w-full  justify-center h-fit p-4">
        <div className="flex bg-gray-900 justify-center items-center border w-[60%] rounded-lg border-white px-2 gap-5 ">
          <input
            className="text-white flex-1  w-[50%] p-5 rounded-md bg-gray-900 outline-none"
            placeholder="Take a note..."
          />
          <IoIosCheckboxOutline className="text-2xl text-white" />
          <HiOutlinePaintBrush className="text-white text-2xl" />
          <MdOutlinePhotoSizeSelectActual className="text-white text-2xl" />
        </div>
      </div>
      <div className="text-white p-4 max-w-full gap-3 columns-4">
        {allTodos &&
          allTodos.map((todo: any) => {
            return (
              <div className="flex flex-col gap-2 border-2 mb-3 w-full  border-white p-2 break-inside-avoid rounded-lg  ">
                <h1 className="text-xl font-bold">{todo.title}</h1>
                <div className="flex gap-2">{todo.labels.map((label:any)=>(<p className="p-2 rounded-md border-blue-400 bg-blue-100 bg-opacity-30">{label}</p>))}</div>
                <p>{todo.content}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default page;
