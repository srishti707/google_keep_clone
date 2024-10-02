import { get_todo, server_uri } from "@/constants";
import axios from "axios";

export async function fetchTodos(params:any){
const response=await axios.get(`${server_uri}${get_todo}?userId=66fbd05f8ab56098a7c329b3`)
console.log(response);
return response.data

}