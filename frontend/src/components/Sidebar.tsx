import React from 'react'
import profile from "../../public/profile pic.jpg"
function Sidebar() {
  return (
   <aside className='min-w-[20vw] shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-gray-800 text-white p-4 flex flex-col gap-5 sticky top-14 left-0 h-full'>
    <div className='flex w-full gap-5 justify-center items-center p-3 '>
        <img className='rounded-full h-16 w-16 '
        src={profile.src} alt="Profile Image"/>
        <div className='flex flex-col gap-2 '>
            <p className='font-semibold'>SRISHTI BHATIA</p>
            <p className="italic text-sm">srishtibhatia7070@gmail.com</p>
        </div>
    </div>
   </aside>
  )
}

export default Sidebar
