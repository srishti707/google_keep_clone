"use client";
import useDebounce from "@/hooks/useDebounce";
import { fetchTodos } from "@/networks/todo_networks";
import { createContext, useEffect, useState } from "react";
import React from "react";
const TodoContext=createContext({
    allTodos:[],
    getTodos:()=>{ },
    loading:false,
    searchInput: "",
    setSearchInput: (input: string) => { } //this function will update the search input value and call getTodos function to fetch new data based on the updated search input.
//initial values of fields
})
interface ContextProviderProps{
    children:React.ReactNode;
 
}
export function TodoContextProvider({children}:ContextProviderProps){
    
    const [allTodos, setAllTodos] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const[searchInput,setSearchInput] = useState<string>("");
    const debouncedVal=useDebounce(searchInput);
    useEffect(() => {
      getTodos();
    }, [debouncedVal]);

    async function getTodos() {
        setLoading(true);
        const response = await fetchTodos({searchTitle:searchInput});
        console.log("response------->", response);
        if (response.success) {
          setAllTodos(response.data);
        } else {
          console.log("error in fetching todos.");
        }
        setLoading(false);
      }
      const ctxValue={allTodos,getTodos,loading,searchInput,setSearchInput}
return <TodoContext.Provider value={ctxValue}>
    {children}
    
</TodoContext.Provider>
}
export default TodoContext;