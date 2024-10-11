import { get_todo, server_uri,create_todo, delete_todo, update_todo } from "@/constants";
import axios from "axios";

export async function fetchTodos(params:any){
const response=await axios.get(`${server_uri}${get_todo}?userId=66fbd05f8ab56098a7c329b3`)
console.log(response);
return response.data

}
export async function createTodo(body:any){
    const response=await axios.post(`${server_uri}${create_todo}`,body)//data ko frontend se is params (body)mai bheja hai
    console.log(response);
    return response.data
}
export async function deleteTodo(params:any){
const response=await axios.post(`${server_uri}${delete_todo}?todo_id=${params.todo_id}`);
return response.data;
}
export async function updateTodo(params:any){
    const response=await axios.post(`${server_uri}${update_todo}?todo_id=${params.todo_id}`,params.body);
    return response.data;
}
//these functions request backend using axios and receives response from backend .then returns response.data.