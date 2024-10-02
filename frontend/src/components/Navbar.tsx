import React from "react";
import { SiGooglekeep } from "react-icons/si";
import { VscThreeBars } from "react-icons/vsc";
import keep from "../../public/google keep img.png";
import { IoMdRefresh } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
function Navbar() {
  return (
    <nav className="w-full h-14 border-b px-7 py-3 bg-gray-900 z-50 sticky top-0 left-0 flex items-center gap-5">
      <VscThreeBars className="text-2xl text-white" />
     <div className="flex gap-1 items-center">
     <img src={keep.src} alt="Google" className="h-10" />
     <h1 className="text-2xl text-white font-medium underline">Keep</h1>
     </div>
 
      <div className="flex gap-1 w-[50%] justify-center items-center ml-10">
        <IoSearch className="text-2xl text-white" />
        <input
          className="bg-gray-600 rounded-md  py-2 px-4 w-full"
          placeholder="Search"
        />
      </div>
      <IoMdRefresh className="text-white text-2xl" />
    </nav>
  );
}

export default Navbar;
