"use client";
import React, { useState } from "react";
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';

const UserWidget = ({ user }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userfixed, setUser] = useState<any>(user);
  const [copyUser, setCopyUser] = useState<any>(user);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const deactivateUser = async() => {
    // Add your deactivation logic here
    console.log("User deactivated");
    const response = await axios.post("/api/changeUserActive",{
        email:copyUser.email,
        newStatus:!copyUser.isActive
    })
    console.log(response)
    setCopyUser((prevState: any) => ({
        ...prevState,
        isActive:!copyUser.isActive ,
      }));
  };

  const handleCancel = () => {
    setCopyUser(userfixed);
    setIsEditing(false);
  };

  const handleSubmit = async(e:any) => {
    e.preventDefault();
    const response = await axios.post("/api/updateUser",{
        user:copyUser
    })
    console.log(response)
    if(response.data.db=="success"){
        setUser(copyUser)
        setIsEditing(false)
        toast.success("Record successfully updated")
    }else{
        toast.error("Oops, could not update record")
    }
  };

  const handleNewUserChange = (e: any) => {
    const { id, value } = e.target;
    setCopyUser((prevState: any) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const color = (copyUser.isActive)?"bg-red-500 hover:bg-red-700":"bg-green-500 hover:bg-green-700"

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-full md:w-1/3 m-2">
      <div className="flex flex-col space-y-3">
        <div>
          <button
            className={"text-white font-bold py-2 px-4 rounded float-right " + color}
            onClick={deactivateUser}
          >
            {(copyUser.isActive)?"Deactivate":"Activate"}
          </button>
          <div className="font-bold text-lg">
            First Name:{" "}
            <span className="font-normal">{userfixed.first_name}</span>
          </div>
          <div className="font-bold text-lg">
            Last Name:{" "}
            <span className="font-normal">{userfixed.last_name}</span>
          </div>
        </div>
        <div className={(copyUser.isActive) ? "text-green-500" : "text-red-500"}>
          {(copyUser.isActive) ? "Active" : "Inactive"}
        </div>

        <button
          onClick={toggleModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          See More
        </button>
        <button
          onClick={toggleEditing}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Edit User
        </button>
      </div>

      {/* More Sections Modal */}
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-scroll">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Modal overlay */}
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>

            {/* Modal content */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  {/* Add modal content here */}
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      More Sections
                    </h3>
                    <div className="mt-2">
                      <div>
                        <strong>Name: </strong> {userfixed.first_name}{" "}
                        {userfixed.last_name}
                      </div>
                      <div>
                        <strong>Email: </strong> {userfixed.email}
                      </div>
                      <div>
                        <strong>Job Title: </strong> {userfixed.job_title}
                      </div>
                      <div>
                        <strong>Permission Level: </strong>{" "}
                        {userfixed.permission_level}
                      </div>
                      <div>
                        <strong>Emergency Contact Name: </strong>{" "}
                        {userfixed.emergency_contact_name}
                      </div>
                      <div>
                        <strong>Emergency Contact Number: </strong>{" "}
                        {userfixed.emergency_contact_number}
                      </div>
                      <div>
                        <strong>Emergency Contact Address: </strong>{" "}
                        {userfixed.emergency_contact_address}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={toggleModal}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Editing Modal */}
      {isEditing && (
        <div className="fixed z-10 inset-0 overflow-y-scroll">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Modal overlay */}
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-5"
              aria-hidden="true"
            ></div>

            {/* Modal content for editing */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom max-h-96 bg-white rounded-lg text-left overflow-y-scroll overflow-x-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  {/* Add editing modal content here */}
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Edit User
                    </h3>
                    <div className="mt-2">
                      <form >
                        <div>
                          <label>
                            <strong>First Name:</strong>
                          </label>
                          <input
                            type="text"
                            placeholder="Jane"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            id="first_name"
                            onChange={handleNewUserChange}
                            value={
                              copyUser.first_name !== null
                                ? copyUser.first_name
                                : ""
                            }
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
                            onChange={handleNewUserChange}
                            value={
                              copyUser.last_name !== null
                                ? copyUser.last_name
                                : ""
                            }
                            required
                          />
                        </div>
                        <div>
                          <div className="py-4">
                            <b>Email: </b> {userfixed.email}
                          </div>
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
                            onChange={handleNewUserChange}
                            value={
                              copyUser.job_title !== null
                                ? copyUser.job_title
                                : ""
                            }
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
                            required
                            onChange={handleNewUserChange}
                          >
                            <option value="Admin">Admin (full access)</option>
                            <option value="Technician">
                              Technician (edit access)
                            </option>
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
                            onChange={handleNewUserChange}
                            value={
                              copyUser.contact_number !== null
                                ? copyUser.contact_number
                                : ""
                            }
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
                              copyUser.emergency_contact_name !== null
                                ? copyUser.emergency_contact_name
                                : ""
                            }
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
                              copyUser.emergency_contact_number !== null
                                ? copyUser.emergency_contact_number
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
                              copyUser.emergency_contact_address !== null
                                ? copyUser.emergency_contact_address
                                : ""
                            }
                          />
                        </div>
                        <div className="flex justify-around py-4">
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
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster/>
    </div>
  );
};

export default UserWidget;
