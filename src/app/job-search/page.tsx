"use client";
import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import WipWidget from "@/components/wips";
import { UserContext } from "@/contexts/userAccessContext";
const JobSearch = () => {
  const { userAccess, setUserAccess } = useContext<any>(UserContext);
  const searchResRef = useRef<any>(null);
  const newJobRef = useRef<any>(null);

  const [searchType, setSearchType] = useState<String>("wip");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<any>("none");
  useEffect(() => {
    if (searchResRef.current !== null) {
      searchResRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [results]);
  const [addJob, setAddJob] = useState<boolean>(false);
  useEffect(() => {
    if (newJobRef.current !== null) {
      newJobRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [addJob]);
  const [newJob, setNewJob] = useState<any>({
    reg: null,
    vin: null,
    assignee: null,
    estimated_cost: null,
    estimated_hours: null,
    date_checked_in: null,
    date_finished: null,
    client_contact_name: null,
    client_contact_email: null,
    client_contact_phone: null,
    actual_cost: null,
    actual_hours: null,
    notes: null,
  });

  const handleJobChange = (e: any) => {
    const { id, value } = e.target;
    if (
      (id == "reg" && value.length <= 7) ||
      (id == "vin" && value.length <= 17)
    ) {
      setNewJob((prevState: any) => ({
        ...prevState,
        [id]: value.toUpperCase(),
      }));
    } else if (id.includes("cost") && !value.includes("£")) {
      setNewJob((prevState: any) => ({
        ...prevState,
        [id]: "£" + value,
      }));
    } else if (id !== "reg" && id !== "vin") {
      setNewJob((prevState: any) => ({
        ...prevState,
        [id]: value,
      }));
    } else {
      setNewJob((prevState: any) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleSearchChange = (search: String) => {
    setSearchType(search);
  };

  const handleCancel = () => {
    setAddJob(false);
  };

  const handleSearchTermChange = (e: any) => {
    const { id, value } = e.target;
    setSearchTerm("");
    if (id == "reg") {
      setSearchTerm(value.toUpperCase());
    } else {
      setSearchTerm(value);
    }
  };

  const handleAddJob = () => {
    setAddJob(true);
  };

  const handleSearch = async (e: any) => {
    if (searchTerm == "") {
      toast.error("Please enter a search term");
      setResults("none");
      return;
    }
    setAddJob(false);
    e.preventDefault();

    if (searchType == "reg") {
      const response = await axios.post("/api/getJobsByReg", {
        reg: searchTerm,
      });
      setResults(response.data.vehicle);
      console.log(response.data.vehicle);
    } else {
      const response = await axios.post("/api/getJobsByWip", {
        wip: searchTerm,
      });
      setResults(response.data.vehicle);
      console.log(response.data.vehicle);
    }
    setSearchTerm("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await axios.post("/api/createNewJob", {
      jobDetails: newJob,
    });
    if (response.data.response !== "error") {
      setNewJob({
        reg: null,
        vin: null,
        assignee: null,
        estimated_cost: null,
        estimated_hours: null,
        date_checked_in: null,
        date_finished: null,
        client_contact_name: null,
        client_contact_email: null,
        client_contact_phone: null,
        actual_cost: null,
        actual_hours: null,
        notes: null,
      });
      console.log(response.data.response);
      toast.success(response.data.response);
    } else {
      toast.error("Oops, could not upload entry");
    }
  };

  return (
    <>
      <div className="w-3/4 lg:w-1/2 mx-auto">
        <div className="text-center my-4">
          Search By{" "}
          <select
            id="searchInput"
            name="searchInput"
            onChange={(e) => handleSearchChange(e.target.value)}
          >
            <option value="wip">Wip Number</option>
            <option value="reg">Registration</option>
          </select>
        </div>
        <div>
          <div className="py-4">
            <label>
              <strong>
                {searchType == "wip" ? "WIP Number:" : "Registration:"}
              </strong>
            </label>
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-md w-full mx-auto"
              id={searchType == "wip" ? "wip" : "reg"}
              placeholder={searchType == "wip" ? "12345" : "AB12ABC"}
              onChange={handleSearchTermChange}
              value={searchTerm}
            />
          </div>
        </div>
        <div>
          <button
            className="w-full rounded p-2 my-2 text-center transition duration-300 ease-in-out bg-blue-400 hover:bg-blue-200 text-white"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {userAccess !== "read_only" && userAccess !== null ? (
          <>
            <div>
              <button
                className="w-full rounded p-2 my-2 text-center transition duration-300 ease-in-out bg-green-400 hover:bg-green-200 text-white"
                onClick={handleAddJob}
              >
                Add New Job
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      {results !== "error" &&
      results !== "missing" &&
      results !== "none" &&
      !addJob &&
      results.length > 0 ? (
        <div ref={searchResRef}>
          {results.map((item: any, index: string) => (
            <div key={index}>
              <WipWidget item={item} />
            </div>
          ))}
        </div>
      ) : results == "none" && !addJob && results.length < 1 ? (
        <></>
      ) : !addJob && results.length < 1 ? (
        <>
          <p className="mx-auto my-8 text-center">No results</p>
        </>
      ) : (
        <></>
      )}
      {addJob ? (
        <form onChange={handleJobChange} ref={newJobRef}>
          <div className="bg-white shadow-lg rounded-lg p-4 max-w-2xl mx-auto my-6">
            <div className="flex justify-between my-2">
              <h2 className="text-2xl font-bold mb-4 text-center inline">
                Job Details
              </h2>
              {/* SVG Icon */}
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
                  value={newJob.reg !== null ? newJob.reg : ""}
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
                  value={newJob.vin !== null ? newJob.vin : ""}
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
                  value={newJob.assignee !== null ? newJob.assignee : ""}
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
                    newJob.estimated_cost !== null ? newJob.estimated_cost : ""
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
                    newJob.estimated_hours !== null
                      ? newJob.estimated_hours
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
                    newJob.date_checked_in !== null
                      ? newJob.date_checked_in
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
                    newJob.date_finished !== null ? newJob.date_finished : ""
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
                    newJob.client_contact_name !== null
                      ? newJob.client_contact_name
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
                    newJob.client_contact_email !== null
                      ? newJob.client_contact_email
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
                    newJob.client_contact_phone !== null
                      ? newJob.client_contact_phone
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
                  value={newJob.actual_cost !== null ? newJob.actual_cost : ""}
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
                    newJob.actual_hours !== null ? newJob.actual_hours : ""
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
                value={newJob.notes !== null ? newJob.notes : ""}
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
        <></>
      )}
      <Toaster />
    </>
  );
};
export default JobSearch;
