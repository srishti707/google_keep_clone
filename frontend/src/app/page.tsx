import React from 'react'

function page() {
  return (
    
   <main className=' flex justify-center items-center '>
  
    <div className='rounded-md p-5 w-[35vw] flex flex-col gap-6 bg-gradient-to-b from-gray-900 to-gray-500'>
        <div className='flex flex-col  gap-3'>
            <label className='text-white '>Name</label>
            <input type="text" placeholder="enter your name.." className='px-4 py-2 border-2  w-full rounded-sm  text-white'/>
        </div>
        <div className='flex flex-col  gap-3'>
            <label className='text-white'>E-mail</label>
            <input type="text" placeholder="enter your email.." className='px-4 py-2 border-2  w-full rounded-sm text-white'/>
        </div>
        <div className='flex flex-col  gap-3'>
            <label className='text-white'>Password</label>
            <input  type="password" placeholder="enter your password.." className='px-4 py-2 w-full  border-2 rounded-sm text-white'/>
        </div>
        <div className='flex flex-col  gap-3'>
            <label className='text-white'>Confirm Password</label>
            <input type="text" placeholder="enter your password again.." className='px-4 py-2 w-full  border-2 rounded-sm  text-white'/>
        </div>
        <button className='w-full p-1 h-[50px] rounded-md bg-gradient-to-r from-blue-900 to-blue-400'>
          <div className='w-full h-full rounded-md bg-gray-600 text-white flex justify-center items-center text-lg hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-400'>
              SignUp
          </div>
        </button>
    </div>
   </main>
  )
}

export default page
