"use client"
import {useState, useContext} from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from '@/contexts/userAccessContext'; // Replace with the actual path to your context file



interface input {
    email: string | null;
    password: string | null;
  }

const Login = () => {
    // Use the useContext hook to access the context
    const { userAccess, setUserAccess } = useContext(UserContext);
    const [input,setInput]=useState<input>({
        email:null,
        password:null
    })
    const handleInputChange = (e: any) => {
        const { id, value } = e.target;
        setInput((prevState: any) => ({
            ...prevState,
            [id]: value,
          }));
        
      };
      
      const handleSubmit = async(e:any) => {
        e.preventDefault();
        if(input.email==null || input.password==null){
            toast.error("Please enter a username and password.")
            return;
        }
        const response = await axios.post("/api/loginUser",{
            email:input.email,
            password:input.password
        })
        console.log(response)
        if(response.data.value.status==="success"){
          if(response.data.permission_level){
            setUserAccess(response.data.permission_level);
          }
            window.location.reload();
            toast.success("successfully logged in")
        }else{
            toast.error("incorrect username or password")
        }
      }
    return(
        <>
            <h1 className="text-2xl text-center mt-4">Sign In</h1>
      <form className="w-full md:w-1/2 mx-auto my-3">
        <div className="grid grid-cols-1  gap-x-4 gap-y-2 my-2">
          <div>
            <label>
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              placeholder="jane@example.com"
              className="w-full p-2 border border-gray-300 rounded-md"
              id="email"
              value={(input.email!==null)?input.email:""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md"
              id="password"
              value={(input.password!==null)?input.password:""}
              onChange={handleInputChange}
              required
            />
          </div>
          </div>
          <div className="flex justify-around my-5">
            <button
              className="py-2 px-6 bg-green-400 hover:bg-green-600 text-white rounded w-full"
              onClick={handleSubmit}
            >
              Sign In
            </button>
            
          </div>
          </form>
          <Toaster/>
        </>
    )
}

export default Login;