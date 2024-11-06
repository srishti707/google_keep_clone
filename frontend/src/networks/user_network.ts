import { login_user, server_uri, signup_user } from "@/constants";
import axios from "axios";

export async function signUp(params: any) {
  try {
    const response = await axios.post(`${server_uri}${signup_user}`, params);
    console.log("response is------>", response);
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
export async function login(params:{email:string,password:string}){
  try{
    const response=await axios.post(`${server_uri}${login_user}`,params);
    console.log("response---->",response);
    return response;
  }
  catch(err){
    console.log(err);
    throw err;
  }
}
