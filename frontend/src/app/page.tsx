"use client";

import { fetchTodos } from "@/networks/todo_networks";
import { useEffect, useState } from "react";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { IoIosCheckboxOutline } from "react-icons/io";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";

function page() {
  const [allTodos, setAllTodos] = useState([]);
  useEffect(() => {
    getTodos();
  }, []);
  async function getTodos() {
    const response = await fetchTodos({});
    console.log("response------->", response);
    if (response.success) {
      setAllTodos(response.data);
    } else {
      console.log("error in fetching todos.");
    }
  }
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
