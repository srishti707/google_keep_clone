import { get_todo, server_uri,create_todo, delete_todo, update_todo } from "@/constants";
import axios from "axios";

export async function fetchTodos(params:any){
    try{
        const token=localStorage.getItem('token');
    const response=await axios.get(`${server_uri}${get_todo}?searchTitle=${encodeURIComponent(params.searchTitle)}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    console.log(response);
    return response.data

    }
catch(err){
    console.log(err);
    throw err;
}
}
export async function createTodo(body:any){
    const token=localStorage.getItem('token');
    const response=await axios.post(`${server_uri}${create_todo}`,body,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })//data ko frontend se is params (body)mai bheja hai
    console.log(response);
    return response.data
}
export async function deleteTodo(params:any){
    const token=localStorage.getItem('token');
const response=await axios.post(`${server_uri}${delete_todo}?todo_id=${params.todo_id}`);
return response.data;
}
export async function updateTodo(params:any){
    const token=localStorage.getItem('token');
    const response=await axios.post(`${server_uri}${update_todo}?todo_id=${params.todo_id}`,params.body,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
    return response.data;
}
//these functions request backend using axios and receives response from backend .then returns response.data.