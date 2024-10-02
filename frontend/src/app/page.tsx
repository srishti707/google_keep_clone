"use client"

import { fetchTodos } from "@/networks/todo_networks"
import { useEffect } from "react"


function page() {
  useEffect(() => {
    getTodos()
  }, [])
  async function getTodos(){
    const response=await fetchTodos({})
  
  }
  return (
    <div className='flex-1 bg-gray-900 h-full '>
      app
    </div>
  )
}

export default page
