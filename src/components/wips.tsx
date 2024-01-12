"use client";
import axios from "axios";
import { useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { UserContext } from "@/contexts/userAccessContext";
const WipWidget = (item: any) => {
  const { userAccess, setUserAccess } = useContext<any>(UserContext);
  const [editing, setEditing] = useState<boolean>(false);
  const [popup, setPopUp] = useState("");
  const [isDeleted, setDeleted] = useState(false);
  const [copyJob, setCopyJob] = useState<any>(item.item);
  const [job, setJob] = useState<any>(item.item);
  const options = {
    title: `Delete ${popup}`,
    message: "This will delete the record with no option of retrieval.",
    buttons: [
      {
        label: "Yes",
        onClick: () => confirmDelete(),
      },
      {
        label: "No",
      },
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
    keyCodeForClose: [8, 32],
    willUnmount: () => {},
    afterClose: () => {},
    onClickOutside: () => {},
    onKeypress: () => {},
    onKeypressEscape: () => {},
    overlayClassName: "overlay-custom-class-name",
  };
  const handleDelete = () => {
    confirmAlert(options);
  };
  const confirmDelete = async () => {
    const response = await axios.post("/api/deletewip", {
      wip: copyJob.wip,
    });
    if (response.data.vehicle !== "error") {
      console.log(response.data.vehicle);
      toast.success("WIP successfully deleted");
      setDeleted(true);
    } else {
      toast.error("WIP could not be deleted");
    }
  };

  const handleJobChange = (e: any) => {
    const { id, value } = e.target;
    if (
      (id == "reg" && value.length <= 7) ||
      (id == "vin" && value.length <= 17)
    ) {
      setCopyJob((prevState: any) => ({
        ...prevState,
        [id]: value.toUpperCase(),
      }));
    } else if (id.includes("cost") && !value.includes("£")) {
      setCopyJob((prevState: any) => ({
        ...prevState,
        [id]: "£" + value,
      }));
    } else if (id !== "reg" && id !== "vin") {
      setCopyJob((prevState: any) => ({
        ...prevState,
        [id]: value,
      }));
    } else {
      setCopyJob((prevState: any) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await axios.post("/api/updateJob", {
      jobDetails: copyJob,
    });
    if (response.data.response !== "error") {
      setEditing(false);
      setJob(copyJob);
      toast.success(response.data.response);
    } else {
      toast.error("Oops, could not upload entry");
    }
  };

  const handleCancel = (e: any) => {
    e.preventDefault();
    setCopyJob(job);
    setEditing(false);
  };

  return (
    <>
      {editing ? (
        <form onChange={handleJobChange} className={isDeleted ? "hidden" : ""}>
          <div className="bg-white shadow-lg rounded-lg p-4 max-w-2xl mx-auto my-6">
            <div>
              <div className="flex justify-between my-2">
                <h2 className="text-2xl font-bold mb-4 text-center inline">
                  Job Details
                </h2>
                <p>{copyJob.wip}</p>
                <div className="flex">
                  {userAccess !== "read_only" && userAccess !== null ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="feather feather-edit inline hover:cursor-pointer mx-2 invisible"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        onClick={() => setEditing(true)}
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#fa0c07"
                        height="24"
                        width="24"
                        version="1.1"
                        id="Layer_1"
                        viewBox="0 0 330 330"
                        className="hover:cursor-pointer "
                        onClick={() => handleDelete()}
                      >
                        <g id="XMLID_6_">
                          <g id="XMLID_11_">
                            <path d="M240,121.076H30V275c0,8.284,6.716,15,15,15h60h37.596c19.246,24.348,49.031,40,82.404,40c57.897,0,105-47.103,105-105    C330,172.195,290.816,128.377,240,121.076z M225,300c-41.355,0-75-33.645-75-75s33.645-75,75-75s75,33.645,75,75    S266.355,300,225,300z" />
                          </g>
                          <g id="XMLID_18_">
                            <path d="M240,90h15c8.284,0,15-6.716,15-15s-6.716-15-15-15h-30h-15V15c0-8.284-6.716-15-15-15H75c-8.284,0-15,6.716-15,15v45H45    H15C6.716,60,0,66.716,0,75s6.716,15,15,15h15H240z M90,30h90v30h-15h-60H90V30z" />
                          </g>
                          <g id="XMLID_23_">
                            <path d="M256.819,193.181c-5.857-5.858-15.355-5.858-21.213,0L225,203.787l-10.606-10.606c-5.857-5.858-15.355-5.858-21.213,0    c-5.858,5.858-5.858,15.355,0,21.213L203.787,225l-10.606,10.606c-5.858,5.858-5.858,15.355,0,21.213    c2.929,2.929,6.768,4.394,10.606,4.394c3.839,0,7.678-1.465,10.607-4.394L225,246.213l10.606,10.606    c2.929,2.929,6.768,4.394,10.607,4.394c3.839,0,7.678-1.465,10.606-4.394c5.858-5.858,5.858-15.355,0-21.213L246.213,225    l10.606-10.606C262.678,208.535,262.678,199.039,256.819,193.181z" />
                          </g>
                        </g>
                      </svg>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <label>
                  <strong>Registration:</strong>
                </label>
                <input
                  type="text"
                  placeholder="AB12 ABC"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  id="reg"
                  value={copyJob.reg !== null ? copyJob.reg : ""}
                  required
                />
              </div>
              <div>
                <label>
                  <strong>VIN:</strong>
                </label>
                <input
                  type="text"
                  placeholder="1HGBH41JXMN109187"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  id="vin"
                  value={copyJob.vin !== null ? copyJob.vin : ""}
                  required
                />
              </div>
              <div>
                <label>
                  <strong>Assignee:</strong>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  id="assignee"
                  value={copyJob.assignee !== null ? copyJob.assignee : ""}
                />
              </div>
              <div>
                <label>
                  <strong>Estimated Cost:</strong>
                </label>
                <input
                  type="text"
                  placeholder="£1000"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  id="estimated_cost"
                  value={
                    copyJob.estimated_cost !== null
                      ? copyJob.estimated_cost
                      : ""
                  }
                />
              </div>
              <div>
                <label>
                  <strong>Estimated Hours:</strong>
                </label>
                <input
                  type="text"
                  placeholder="10"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  id="estimated_hours"
                  value={
                    copyJob.estimated_hours !== null
                      ? copyJob.estimated_hours
                      : ""
                  }
                />
              </div>
              <div>
                <label>
                  <strong>Date checked in:</strong>
                </label>
                <input
                  type="date"
                  placeholder="yyyy-mm-dd"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  id="date_checked_in"
                  value={
                    copyJob.date_checked_in !== null
                      ? copyJob.date_checked_in
                      : ""
                  }
                />
              </div>
              <div>
                <label>
                  <strong>Date Finished:</strong>
                </label>
                <input
                  type="date"
                  placeholder="yyyy-mm-dd"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  id="date_finished"
                  value={
                    copyJob.date_finished !== null ? copyJob.date_finished : ""
                  }
                />
              </div>
              <div>
                <label>
                  <strong>Client Name:</strong>
                </label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  id="client_contact_name"
                  value={
                    copyJob.client_contact_name !== null
                      ? copyJob.client_contact_name
                      : ""
                  }
                  required
                />
              </div>
              <div>
                <label>
                  <strong>Client Contact Email:</strong>
                </label>
                <input
                  type="email"
                  placeholder="Jane.doe@gmail.com"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  id="client_contact_email"
                  value={
                    copyJob.client_contact_email !== null
                      ? copyJob.client_contact_email
                      : ""
                  }
                />
              </div>
              <div>
                <label>
                  <strong>Client Phone Number:</strong>
                </label>
                <input
                  type="text"
                  placeholder="07346 465893"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  id="client_contact_phone"
                  value={
                    copyJob.client_contact_phone !== null
                      ? copyJob.client_contact_phone
                      : ""
                  }
                  required
                />
              </div>
              <div>
                <label>
                  <strong>Actual Cost:</strong>
                </label>
                <input
                  type="text"
                  placeholder="£900"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  id="actual_cost"
                  value={
                    copyJob.actual_cost !== null ? copyJob.actual_cost : ""
                  }
                />
              </div>
              <div>
                <label>
                  <strong>Actual Hours:</strong>
                </label>
                <input
                  type="text"
                  placeholder="9"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  id="actual_hours"
                  value={
                    copyJob.actual_hours !== null ? copyJob.actual_hours : ""
                  }
                  required
                />
              </div>
            </div>
            <div className="mt-6 w-full">
              <h3 className="font-semibold text-lg mb-2">Additional Notes</h3>
              <textarea
                className="w-full h-32 p-4 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none resize-none"
                placeholder="No notes"
                id="notes"
                value={copyJob.notes !== null ? copyJob.notes : ""}
              ></textarea>
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
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className={isDeleted ? "hidden" : ""}>
          <div className="bg-white shadow-lg rounded-lg p-4 max-w-2xl mx-auto my-6">
            <div>
              <div className="flex justify-between my-2">
                <h2 className="text-2xl font-bold mb-4 text-center inline">
                  Job Details
                </h2>
                <p>{job.wip}</p>
                <div className="flex">
                  {userAccess !== "read_only" && userAccess !== null ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="feather feather-edit inline hover:cursor-pointer mx-2"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        onClick={() => setEditing(true)}
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                        height="24"
                        width="24"
                        version="1.1"
                        id="Layer_1"
                        viewBox="0 0 330 330"
                        className="hover:cursor-pointer invisible"
                      >
                        <g id="XMLID_6_">
                          <g id="XMLID_11_">
                            <path d="M240,121.076H30V275c0,8.284,6.716,15,15,15h60h37.596c19.246,24.348,49.031,40,82.404,40c57.897,0,105-47.103,105-105    C330,172.195,290.816,128.377,240,121.076z M225,300c-41.355,0-75-33.645-75-75s33.645-75,75-75s75,33.645,75,75    S266.355,300,225,300z" />
                          </g>
                          <g id="XMLID_18_">
                            <path d="M240,90h15c8.284,0,15-6.716,15-15s-6.716-15-15-15h-30h-15V15c0-8.284-6.716-15-15-15H75c-8.284,0-15,6.716-15,15v45H45    H15C6.716,60,0,66.716,0,75s6.716,15,15,15h15H240z M90,30h90v30h-15h-60H90V30z" />
                          </g>
                          <g id="XMLID_23_">
                            <path d="M256.819,193.181c-5.857-5.858-15.355-5.858-21.213,0L225,203.787l-10.606-10.606c-5.857-5.858-15.355-5.858-21.213,0    c-5.858,5.858-5.858,15.355,0,21.213L203.787,225l-10.606,10.606c-5.858,5.858-5.858,15.355,0,21.213    c2.929,2.929,6.768,4.394,10.606,4.394c3.839,0,7.678-1.465,10.607-4.394L225,246.213l10.606,10.606    c2.929,2.929,6.768,4.394,10.607,4.394c3.839,0,7.678-1.465,10.606-4.394c5.858-5.858,5.858-15.355,0-21.213L246.213,225    l10.606-10.606C262.678,208.535,262.678,199.039,256.819,193.181z" />
                          </g>
                        </g>
                      </svg>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <label>
                  <strong>Registration: </strong>
                  {job.reg}
                </label>
              </div>
              <div>
                <label>
                  <strong>VIN: </strong>
                  {job.vin}
                </label>
              </div>
              <div>
                <label>
                  <strong>Assignee: </strong>
                  {job.assignee}
                </label>
              </div>
              <div>
                <label>
                  <strong>Estimated Cost: </strong>
                  {job.estimated_cost}
                </label>
              </div>
              <div>
                <label>
                  <strong>Estimated Hours: </strong>
                  {job.estimated_hours}
                </label>
              </div>
              <div>
                <label>
                  <strong>Date checked in: </strong>
                  {job.date_checked_in}
                </label>
              </div>
              <div>
                <label>
                  <strong>Date Finished: </strong>
                  {job.date_finished}
                </label>
              </div>
              <div>
                <label>
                  <strong>Client Name: </strong>
                  {job.client_contact_name}
                </label>
              </div>
              <div>
                <label>
                  <strong>Client Contact Email: </strong>
                  {job.client_contact_email}
                </label>
              </div>
              <div>
                <label>
                  <strong>Client Phone Number: </strong>
                  {job.client_contact_phone}
                </label>
              </div>
              <div>
                <label>
                  <strong>Actual Cost: </strong>
                  {job.actual_cost}
                </label>
              </div>
              <div>
                <label>
                  <strong>Actual Hours: </strong>
                  {job.actual_hours}
                </label>
              </div>
            </div>
            <div className="mt-6 w-full">
              <h3 className="font-semibold text-lg mb-2">Additional Notes</h3>
              <textarea
                className="w-full h-32 p-4 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none resize-none"
                placeholder="No notes"
                id="notes"
                value={job.notes !== null ? job.notes : ""}
                readOnly={true}
              ></textarea>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
};

export default WipWidget;
