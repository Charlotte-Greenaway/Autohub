"use client"
import {useState} from 'react';
import axios from 'axios';
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
  interface NewOrg {
    org_name: string | null;
    org_number: string | null;
    org_address: string | null;
  }
const OrgSignUp = () => {
    const [orgdetails,setOrgdetails]=useState<NewOrg>({
        org_name:null,
        org_number:null,
        org_address:null
    })
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

      const handleNewUserChange = (e: any) => {
        const { id, value } = e.target;
        setNewUser((prevState: any) => ({
            ...prevState,
            [id]: value,
          }));
        
      };
      const handleOrgChange = (e: any) => {
        const { id, value } = e.target;
        setOrgdetails((prevState: any) => ({
            ...prevState,
            [id]: value,
          }));
        
      };

      const handleSubmit = async(e:any) => {
        e.preventDefault()
        const userResponse = await axios.post("/api/createNewUser",{
            user:newUser
        })
        if(userResponse.data.db!=="success"){
            toast.error("Could not create user")
        }else{
            const orgResponse = await axios.post("/api/createNewOrg",{
                org:orgdetails
            })
            if(orgResponse.data.db!=="success"){
                toast.error("Could not create org")
            }else{
                toast.success("organisation created successfully")
                window.location.pathname="/"
            }
        }

      }

  return (
    <>
      <h1 className="text-2xl text-center my-4">Create Organisation</h1>
      <form className="w-full md:w-3/4 mx-auto my-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 my-2">
          <div>
            <label>
              <strong>Organisation Name:</strong>
            </label>
            <input
              type="text"
              placeholder="Autohub"
              className="w-full p-2 border border-gray-300 rounded-md"
              id="org_name"
              value={(orgdetails.org_name!==null)?orgdetails.org_name:""}
              onChange={handleOrgChange}
              required
            />
          </div>
          <div>
            <label>
              <strong>Organisation Phone Number:</strong>
            </label>
            <input
              type="text"
              placeholder="01804 732857"
              className="w-full p-2 border border-gray-300 rounded-md"
              id="org_number"
              value={(orgdetails.org_number!==null)?orgdetails.org_number:""}
              onChange={handleOrgChange}
            />
          </div>
          <div>
            <label>
              <strong>Organisation Address:</strong>
            </label>
            <input
              type="text"
              placeholder=" 1 ABc , city, country AB12 ABC"
              className="w-full p-2 border border-gray-300 rounded-md"
              id="org_address"
              value={(orgdetails.org_address!==null)?orgdetails.org_address:""}
              onChange={handleOrgChange}
            />
          </div>
          </div>

          <div className="flex justify-between my-2">
            <h2 className="text-2xl font-bold mb-4 text-center inline my-3">
              First User Details
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
                value={(newUser.first_name!==null)?newUser.first_name:""}
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
                value={(newUser.last_name!==null)?newUser.last_name:""}
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
                value={(newUser.email!==null)?newUser.email:""}
                onChange={handleNewUserChange}
                required
              />
            </div>
            <div>
              <label>
                <strong>Password:</strong>
              </label>
              <input
                type="password"
                placeholder="SetUpPassword1"
                className="w-full p-2 border border-gray-300 rounded-md"
                id="password"
                value={(newUser.password!==null)?newUser.password:""}
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
                value={(newUser.job_title!==null)?newUser.job_title:""}
                onChange={handleNewUserChange}
              />
            </div>
            <div className="flex justify-center flex-col">
              <label>
                <strong>Permission Level:</strong>
              </label>
              <select
                id="permission_level"
                name="permission_level"
                className="border border-gray-300 rounded p-2"
                value={(newUser.permission_level!==null)?newUser.permission_level:""}
                onChange={handleNewUserChange}
                required
              >
                <option value="Admin">Admin (full access)</option>
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
                value={(newUser.contact_number!==null)?newUser.contact_number:""}
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
                value={(newUser.emergency_contact_name!==null)?newUser.emergency_contact_name:""}
                onChange={handleNewUserChange}
              />
            </div>
            <div>
              <label>
                <strong>Emergency Contact Number:</strong>
              </label>
              <input
                type="email"
                placeholder="07780 76684"
                className="w-full p-2 border border-gray-300 rounded-md"
                id="emergency_contact_number"
                value={(newUser.emergency_contact_number!==null)?newUser.emergency_contact_number:""}
                onChange={handleNewUserChange}
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
                value={(newUser.emergency_contact_address!==null)?newUser.emergency_contact_address:""}
                onChange={handleNewUserChange}
              />
            </div>
        </div>
        <div className="flex justify-around my-5">
            <button
              className="py-2 px-6 bg-green-400 hover:bg-green-600 text-white rounded w-full"
              onClick={handleSubmit}
            >
              Save
            </button>
            
          </div>
      </form>
      <Toaster/>
    </>
  );
};
export default OrgSignUp;