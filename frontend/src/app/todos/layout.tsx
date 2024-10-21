import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { TodoContextProvider } from '@/context/TodoContext'
import React from 'react'

function layout({children}:any) {
  return (
    <div>
        <TodoContextProvider>
        <Navbar/>
        <main className="flex w-full min-h-[calc(100vh-56px)] ">
          <Sidebar/>
        {children}

        </main>

        </TodoContextProvider>
     
    </div>
  )
}

export default layout
