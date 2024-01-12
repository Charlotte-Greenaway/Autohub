"use client";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
interface NewUser {
  permission_level: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  password: string | null;
  hasLoggedIn: boolean;
  job_title: string | null;
  contact_number: string | null;
  emergency_contact_name: string | null;
  emergency_contact_number: string | null;
  emergency_contact_address: string | null;
  password_reset_required: boolean | null;
}

const AddNewUser = () => {
  const [newUser, setNewUser] = useState<NewUser>({
    permission_level: "Admin",
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    hasLoggedIn: false,
    job_title: null,
    contact_number: null,
    emergency_contact_name: null,
    emergency_contact_number: null,
    emergency_contact_address: null,
    password_reset_required: null,
  });

  const handleCancel = (e:any) => {
    e.preventDefault()
    setNewUser({
        permission_level: "Admin",
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        hasLoggedIn: false,
        job_title: null,
        contact_number: null,
        emergency_contact_name: null,
        emergency_contact_number: null,
        emergency_contact_address: null,
        password_reset_required: null,
      })
  }

  const handleNewUserChange = (e: any) => {
    const { id, value } = e.target;
    setNewUser((prevState: any) => ({
        ...prevState,
        [id]: value,
      }));
    
  };

  const handleSubmit = async(e:any) => {
    e.preventDefault();
    const response:any = await axios.post("/api/createNewUser",{
        user:newUser
    })
    console.log(response)
    if(response.data.db =="error"){
        toast.error("Oops, could not upload user.")
    }else if(response.data.db=="exists"){
        toast.error("Oops, this user already exists")
    }else if(response.data.db=="success"){
        setNewUser({
            permission_level: "Admin",
            first_name: null,
            last_name: null,
            email: null,
            password: null,
            hasLoggedIn: false,
            job_title: null,
            contact_number: null,
            emergency_contact_name: null,
            emergency_contact_number: null,
            emergency_contact_address: null,
            password_reset_required: null,
          })
          toast.success("Success New user created")
    }
  }
  return (
    <form>
      <div className="bg-white shadow-lg rounded-lg p-4 max-w-2xl mx-auto my-6">
        <div className="flex justify-between my-2">
          <h2 className="text-2xl font-bold mb-4 text-center inline">
            New User Details
          </h2>
          {/* SVG Icon */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
          <div>
            <label>
              <strong>First Name:</strong>
            </label>
            <input
              type="text"
              placeholder="Jane"
              className="w-full p-2 border border-gray-300 rounded-md"
              id="first_name"
              value={newUser.first_name !== null ? newUser.first_name : ""}
              onChange={handleNewUserChange}
              required
            />
          </div>
          <div>
            <label>
              <strong>Last Name:</strong>
            </label>
            <input
              type="text"
              placeholder="Doe"
              className="w-full p-2 border border-gray-300 rounded-md"
              id="last_name"
              value={newUser.last_name !== null ? newUser.last_name : ""}
              onChange={handleNewUserChange}
              required
            />
          </div>
          <div>
            <label>
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              placeholder="Jane.Doe@example.com"
              className="w-full p-2 border border-gray-300 rounded-md"
              id="email"
              required
              value={newUser.email !== null ? newUser.email : ""}
              onChange={handleNewUserChange}
            />
          </div>
          <div>
            <label>
              <strong>Initial Password:</strong>
            </label>
            <input
              type="text"
              placeholder="SetUpPassword1"
              className="w-full p-2 border border-gray-300 rounded-md"
              id="password"
              value={newUser.password !== null ? newUser.password : ""}
              onChange={handleNewUserChange}
              required
            />
          </div>
          <div>
            <label>
              <strong>Job Title:</strong>
            </label>
            <input
              type="text"
              placeholder="Service Manager"
              className="w-full p-2 border border-gray-300 rounded-md"
              id="job_title"
              value={newUser.job_title !== null ? newUser.job_title : ""}
              onChange={handleNewUserChange}
            />
          </div>
          <div className="flex justify-center flex-col">
            <label>
              <strong>Permission Level:</strong>
            </label>
            <select onChange={handleNewUserChange} id="permission_level" name="permission_level" className="border border-gray-300 rounded p-2" required>
              <option value="Admin">Admin (full access)</option>
              <option value="Technician">Technician (edit access)</option>
              <option value="read_only">Read Only</option>
            </select>
          </div>
          <div>
            <label>
              <strong>Contact Number:</strong>
            </label>
            <input
              type="text"
              placeholder="07777 888888"
              className="w-full p-2 border border-gray-300 rounded-md"
              id="contact_number"
              value={newUser.contact_number !== null ? newUser.contact_number : ""}
              onChange={handleNewUserChange}
            />
          </div>
          <div>
            <label>
              <strong>Emergency Contact Name:</strong>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full p-2 border border-gray-300 rounded-md"
              id="emergency_contact_name"
              onChange={handleNewUserChange}
              value={
                newUser.emergency_contact_name !== null
                  ? newUser.emergency_contact_name
                  : ""
              }
              required
            />
          </div>
          <div>
            <label>
              <strong>Emergency Contact Number:</strong>
            </label>
            <input
              type="email"
              placeholder="Jane.doe@gmail.com"
              className="w-full p-2 border border-gray-300 rounded-md"
              id="emergency_contact_number"
              onChange={handleNewUserChange}
              value={
                newUser.emergency_contact_number !== null
                  ? newUser.emergency_contact_number
                  : ""
              }
            />
          </div>
          <div>
            <label>
              <strong>Emergency Contact Address:</strong>
            </label>
            <input
              type="text"
              placeholder=" 1 ABC Close, city, county, AB12 ABC"
              className="w-full p-2 border border-gray-300 rounded-md"
              id="emergency_contact_address"
              onChange={handleNewUserChange}
              value={
                newUser.emergency_contact_address !== null
                  ? newUser.emergency_contact_address
                  : ""
              }
              required
            />
          </div>
          </div>
        <div className="mt-6 w-full">
          <div className="flex justify-around">
            <button
              className="py-2 px-6 bg-green-400 hover:bg-green-600 text-white rounded"
              onClick={handleSubmit}
            >
              Save
            </button>
            <button
              className="py-2 px-4 bg-red-400 hover:bg-red-600 text-white rounded"
              onClick={handleCancel}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      <Toaster/>
    </form>
  );
};

export default AddNewUser;
