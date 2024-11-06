"use client";
import { signUp } from "@/networks/user_network";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(()=>{
    const token=localStorage.getItem("token");
    if(token){
      router.replace("/todos");
    }
  },[])
  const router = useRouter();

  async function handleSignUp() {
    try {
      const params = {
        name,
        email,
        password,
        passwordConfirm: confirmPassword,
      };
      const response: any = await signUp(params);
      console.log("response from backend", response);
      if (response && response.status === 200) {
        const token = response.data.token;

        localStorage.setItem("token", token);
        localStorage.setItem("userId",response.data.data._id);
        localStorage.setItem("name",response.data.data.name);
        localStorage.setItem("email",response.data.data.email);
        console.log("changing route");
        toast.success("user signed up successfully!");
        router.replace("/todos");
      }
    } catch (err: any) {
      const errMsg = err.response.data.message;
      toast.error(errMsg);
    }
  }
  return (
    <main className=" flex flex-col justify-center items-center gap-10 bg-gradient-to-b from-gray-900 to-gray-600  py-10  ">
         <h1 className='text-white text-2xl font-bold w-fit '>SignUp</h1>
      <div className="rounded-md p-5 w-[35vw] flex flex-col gap-6 bg-gradient-to-b from-gray-900 to-gray-500">
        <div className="flex flex-col  gap-3">
          <label className="text-white ">Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="enter your name.."
            className="px-4 py-2 border-2  w-full rounded-sm"
          />
        </div>
        <div className="flex flex-col  gap-3">
          <label className="text-white">E-mail</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="enter your email.."
            className="px-4 py-2 border-2  w-full rounded-sm"
          />
        </div>
        <div className="flex flex-col  gap-3">
          <label className="text-white">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="enter your password.."
            className="px-4 py-2 w-full  border-2 rounded-sm"
          />
        </div>
        <div className="flex flex-col  gap-3">
          <label className="text-white">Confirm Password</label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="text"
            placeholder="enter your password again.."
            className="px-4 py-2 w-full  border-2 rounded-sm"
          />
        </div>
        <button
          onClick={handleSignUp}
          className="w-full p-1 h-[50px] rounded-md bg-gradient-to-r from-blue-900 to-blue-400"
        >
          <div className="w-full h-full rounded-md bg-gray-600 text-white flex justify-center items-center text-lg hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-400">
            SignUp
          </div>
          
        </button>
       <div className="flex gap-2 items-center ">
        <h2 className="text-white"> Already have an account?</h2>
        <button className="text-white p-2 hover:bg-white hover:text-black hover:italic rounded-md"
        onClick={()=>router.push("/login")}>Login</button>
       </div>
      </div>
      <Toaster />
    </main>
  );
}

export default page;
