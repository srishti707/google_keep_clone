"use client"

import React, { useContext, useState } from "react";
import { SiGooglekeep } from "react-icons/si";
import { VscThreeBars } from "react-icons/vsc";
import keep from "../../public/google keep img.png";
import { IoMdRefresh, IoMdSettings } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { TfiViewList } from "react-icons/tfi";
import { CgMenuGridO } from "react-icons/cg";
import TodoContext from "@/context/TodoContext";
import { useRouter } from "next/navigation";
function Navbar({}) {

  const {searchInput,setSearchInput,isSidebarVisible,setIsSideBarVisible}=useContext(TodoContext)
  const router=useRouter();
  function handleLogout(){
    ["token","name","userId","email"].forEach(element => {
    localStorage.removeItem(element)

    })
  router.replace("/login")
  };

function handleSideBar(){
  setIsSideBarVisible((prev)=>!prev);
}

  return (
    <nav className="w-screen h-14 border-b md:px-7 px-3 py-3 bg-gray-900 z-50 sticky top-0 left-0 flex items-center md:gap-5 gap-3">
      
      <VscThreeBars onClick={handleSideBar}
      className="text-2xl text-white md:disabled md:hidden" />
     <div className="flex gap-1 items-center">
     <img src={keep.src} alt="Google" className="h-10" />
     <h1 className="text-2xl text-white font-medium underline">Keep</h1>
     </div>
 
      <div className="flex gap-1 w-[50%] justify-center items-center ml-10">
        <IoSearch className="text-2xl text-white bg-gray-600 rounded-full " />
        <input onChange={(e)=>setSearchInput(e.target.value)}
        value={searchInput}
          className="bg-gray-600 rounded-md  py-2 px-4 w-full"
          placeholder="Search"
        />
      </div>
      <IoMdRefresh className="text-white text-2xl" />
      <TfiViewList className="text-white text-2xl hidden "/>
      <div className="flex gap-4 items-center justify-end w-[25%]">
      <IoMdSettings className="text-white text-2xl"/>
      <CgMenuGridO className="text-white text-3xl"/>
      <button className="text-white text-xl"
      onClick={handleLogout}>LogOut</button>
      </div>
    
    </nav>
  );
}

export default Navbar;
