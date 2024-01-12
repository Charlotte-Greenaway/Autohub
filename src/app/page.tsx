"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import car from "@/assets/car.png";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AddCar from "@/components/addcar";
import { UserContext } from "@/contexts/userAccessContext";
function CarImageWithInput() {
  const { userAccess, setUserAccess } = useContext<any>(UserContext);
  // Initialize with an estimated size if you know the typical dimensions of the image
  const resultsRef = useRef<any>(null);
  const addRef = useRef<any>(null);
  const [isEditing, setEditing] = useState<boolean>(false);
  const [isAddCar, setAddCar] = useState<boolean>(false);
  const [searchType, setSearchType] = useState<String>("reg");
  const [inputStyle, setInputStyle] = useState({ opacity: 0 });
  const [vehicleResult, setVehicleResult] = useState<any>("none");
  const [copyVehicle, setCopyVehicle] = useState<any>("none");
  const imageRef = useRef(null);
  const [reg, setReg] = useState<string>("");

  const handleVehicleChange = (e: any) => {
    const { id, value } = e.target;

    setVehicleResult((prevState: any) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleCancel = () => {
    setEditing(false);
    setVehicleResult(copyVehicle);
  };

  const addCarTrue = () => {
    setEditing(false);
    setVehicleResult("none");
    setAddCar(true);
  };

  const vehicleChangeUpload = async (event: any) => {
    event.preventDefault();
    function isAlphanumeric(value: string) {
      const pattern = /^[a-zA-Z0-9]+$/;
      return pattern.test(value);
    }
    function isValidDate(value: any) {
      const pattern = /^\d{4}-\d{2}-\d{2}$/;
      return pattern.test(value);
    }
    if (
      vehicleResult.reg.length <= 7 &&
      isAlphanumeric(vehicleResult.reg) &&
      isValidDate(vehicleResult.date_of_manufacture) &&
      isValidDate(vehicleResult.warranty_start_date) &&
      isValidDate(vehicleResult.date_of_registration) &&
      isValidDate(vehicleResult.warranty_end_date)
    ) {
      const response = await axios.post("/api/updateDetailsByVin", {
        carDetails: vehicleResult,
      });
      if (response.data.response !== "success") {
        toast.error("Oops something went wrong!");
      } else {
        setCopyVehicle(vehicleResult);
        setEditing(false);
        toast.success("Record updated!");
      }
    } else {
      if (
        !isValidDate(vehicleResult.date_of_manufacture) ||
        !isValidDate(vehicleResult.warranty_start_date) ||
        !isValidDate(vehicleResult.date_of_registration) ||
        !isValidDate(vehicleResult.warranty_end_date)
      ) {
        toast.error("Please format date correctly (yyyy-mm-dd)");
      } else {
        toast.error(
          "Please enter valid registration plate (no spaces or special characters and less than 7 characters)"
        );
      }
    }
  };

  const getVehicleDetail = async () => {
    setAddCar(false);
    if (reg == "") {
      toast.error("Please enter a search term");
      return;
    }
    setEditing(false);
    const url =
      searchType == "reg"
        ? "/api/getVehicleDetailsByReg"
        : "/api/getVehicleDetailsByVin";
    const response = await axios.post(url, {
      reg: reg,
    });
    if (
      response.data.vehicle == "error" ||
      response.data.vehicle == "missing"
    ) {
      setVehicleResult("missing");
    } else {
      setVehicleResult(response.data.vehicle);
      setCopyVehicle(response.data.vehicle);
      setReg("");
    }
  };
  const currentTextSize = searchType == "vin" ? "text-md" : "text-2xl";
  const placeholder = searchType == "vin" ? "1HGBH41JXMN109186" : "AB12 ABC";
  const handleSearchChange = (searchType: String) => {
    setSearchType(searchType);
    setReg("");
  };

  useEffect(() => {
    if (resultsRef.current !== null) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [copyVehicle]);
  useEffect(() => {
    if (addRef.current !== null) {
      addRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isAddCar]);
  const handleRegChange = (e: any) => {
    const inp = e.target.value;
    if (inp.length <= 7 && searchType == "reg") {
      setReg(inp.toUpperCase());
    }
    if (inp.length <= 17 && searchType == "vin") {
      setReg(inp.toUpperCase());
    }
  };
  const updateInputPosition = () => {
    const image = imageRef.current;
    if (image) {
      const { offsetWidth: imgWidth, offsetHeight: imgHeight } = image;
      // Calculate the position and size of the input box based on the image's dimensions
      const newInputStyle = {
        top: `${imgHeight * 0.65}px`,
        left: `${imgWidth * 0.285}px`,
        width: `${imgWidth * 0.43}px`,
        height: `${imgHeight * 0.09}px`,
        opacity: 1, // Show the input
      };
      setInputStyle(newInputStyle);
    }
  };

  useEffect(() => {
    const image: any = imageRef.current;
    const handleResize = () => {
      updateInputPosition();
    };

    if (image) {
      if (image.complete) {
        updateInputPosition();
      } else {
        image.addEventListener("load", updateInputPosition);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      if (image) {
        image.removeEventListener("load", updateInputPosition);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <p className="mx-auto text-center py-2">
        Search by{" "}
        <select
          id="searchInput"
          name="searchInput"
          onChange={(e) => handleSearchChange(e.target.value)}
        >
          <option value="reg">Registration</option>
          <option value="vin">Vin Number</option>
        </select>
      </p>
      <div
        className="relative"
        style={{ position: "relative", width: "fit-content", margin: "auto" }}
      >
        <img ref={imageRef} src={car.src} alt="Car" className="mx-auto" />
        <input
          type="text"
          placeholder={placeholder}
          className={
            "plate absolute bg-[#FFD300] z-10 rounded charles text-center " +
            currentTextSize
          }
          max-length={7}
          value={reg}
          style={inputStyle}
          onChange={handleRegChange}
        />
      </div>
      <div
        className="flex items-center mx-auto"
        style={{ width: "fit-content" }}
      >
        <button
          className="mx-2 bg-gray-200 p-2 hover:bg-gray-400 rounded transition duration-300 ease-in-out"
          onClick={getVehicleDetail}
        >
          Search
        </button>
        {userAccess !== "read_only" && userAccess !== null ? (
          <>
            <button
              className="mx-2 bg-blue-200 p-2 hover:bg-blue-400 rounded transition duration-300 ease-in-out"
              onClick={addCarTrue}
            >
              Add Car
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
      {vehicleResult == "none" && !isAddCar ? (
        <></>
      ) : vehicleResult == "missing" ? (
        <>
          <p className="text-center py-3">No matching results</p>
        </>
      ) : isEditing == false && !isAddCar ? (
        <>
          <div
            className="bg-white shadow-lg rounded-lg p-4 max-w-2xl mx-auto my-6"
            ref={resultsRef}
          >
            <div className="flex justify-between my-2">
              <h2 className="text-2xl font-bold mb-4 text-center inline">
                Vehicle Details
              </h2>
              {userAccess !== "read_only" && userAccess !== null ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="feather feather-edit inline hover:cursor-pointer"
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
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <strong>Registration:</strong> {vehicleResult.reg}
              </div>
              <div>
                <strong>VIN:</strong> {vehicleResult.vin}
              </div>
              <div>
                <strong>Engine Number:</strong> {vehicleResult.engine_number}
              </div>
              <div>
                <strong>Transmission Number:</strong>{" "}
                {vehicleResult.transmission_number}
              </div>
              <div>
                <strong>Date of Manufacture:</strong>{" "}
                {vehicleResult.date_of_manufacture}
              </div>
              <div>
                <strong>Date of Registration:</strong>{" "}
                {vehicleResult.date_of_registration}
              </div>
              <div>
                <strong>Colour:</strong> {vehicleResult.colour}
              </div>
              <div>
                <strong>Paint Code:</strong> {vehicleResult.paint_code}
              </div>
              <div>
                <strong>Warranty Start Date:</strong>{" "}
                {vehicleResult.warranty_start_date}
              </div>
              <div>
                <strong>Warranty End Date:</strong>{" "}
                {vehicleResult.warranty_end_date}
              </div>
              <div>
                <strong>Recalls:</strong> {vehicleResult.recalls}
              </div>
              <div>
                <strong>Make:</strong> {vehicleResult.make}
              </div>
              <div>
                <strong>Model:</strong> {vehicleResult.model}
              </div>
              <div>
                <strong>Manufacturer:</strong> {vehicleResult.manufacturer}
              </div>
              <div>
                <strong>Manufacturer Location:</strong>{" "}
                {vehicleResult.manufacturer_location}
              </div>
              <div>
                <strong>Country of Origin:</strong>{" "}
                {vehicleResult.country_of_origin}
              </div>
              <div>
                <strong>Number of Axels:</strong>{" "}
                {vehicleResult.number_of_axels}
              </div>
              <div>
                <strong>Weight:</strong> {vehicleResult.weight}
              </div>
              <div>
                <strong>Fuel Type:</strong> {vehicleResult.fuel_type}
              </div>
              <div>
                <strong>Drive Type:</strong> {vehicleResult.drive_type}
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">Additional Notes</h3>
              <textarea
                className="w-full h-32 p-4 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none resize-none"
                value={vehicleResult.notes}
                placeholder="No notes"
                readOnly={true}
              ></textarea>
            </div>
          </div>
        </>
      ) : !isAddCar && vehicleResult !== "none" && isEditing ? (
        <>
          <form onChange={handleVehicleChange}>
            <div
              className="bg-white shadow-lg rounded-lg p-4 max-w-2xl mx-auto my-6"
              ref={resultsRef}
            >
              <div className="flex justify-between my-2">
                <h2 className="text-2xl font-bold mb-4 text-center inline">
                  Vehicle Details
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
                    value={vehicleResult.reg}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    id="reg"
                  />
                </div>
                <div>
                  <label>
                    <strong>VIN:</strong>
                  </label>
                  <input
                    type="text"
                    value={vehicleResult.vin}
                    className="w-full p-2 border border-none pointer-events-none rounded-md"
                    readOnly={true}
                  />
                </div>
                <div>
                  <label>
                    <strong>Engine Number:</strong>
                  </label>
                  <input
                    type="text"
                    value={vehicleResult.engine_number}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    id="engine_number"
                  />
                </div>
                <div>
                  <label>
                    <strong>Transmission Number:</strong>
                  </label>
                  <input
                    type="text"
                    value={vehicleResult.transmission_number}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    id="transmission_number"
                  />
                </div>
                <div>
                  <label>
                    <strong>Date of Manufacture:</strong>
                  </label>
                  <input
                    type="date"
                    value={vehicleResult.date_of_manufacture}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    id="date_of_manufacture"
                  />
                </div>
                <div>
                  <label>
                    <strong>Date of Registration:</strong>
                  </label>
                  <input
                    type="date"
                    value={vehicleResult.date_of_registration}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    id="date_of_registration"
                  />
                </div>
                <div>
                  <label>
                    <strong>Colour:</strong>
                  </label>
                  <input
                    type="text"
                    value={vehicleResult.colour}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    id="colour"
                  />
                </div>
                <div>
                  <label>
                    <strong>Paint Code:</strong>
                  </label>
                  <input
                    type="text"
                    value={vehicleResult.paint_code}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    id="paint_code"
                  />
                </div>
                <div>
                  <label>
                    <strong>Warranty Start Date:</strong>
                  </label>
                  <input
                    type="date"
                    value={vehicleResult.warranty_start_date}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    id="warranty_start_date"
                  />
                </div>
                <div>
                  <label>
                    <strong>Warranty End Date:</strong>
                  </label>
                  <input
                    type="date"
                    value={vehicleResult.warranty_end_date}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    id="warranty_end_date"
                  />
                </div>
                <div>
                  <label>
                    <strong>Recalls:</strong>
                  </label>
                  <input
                    type="text"
                    value={vehicleResult.recalls}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    id="recalls"
                  />
                </div>
                <div>
                  <label>
                    <strong>Make:</strong>
                  </label>
                  <input
                    type="text"
                    value={vehicleResult.make}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    id="make"
                  />
                </div>
                <div>
                  <label>
                    <strong>Model:</strong>
                  </label>
                  <input
                    type="text"
                    value={vehicleResult.model}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    id="model"
                  />
                </div>
                <div>
                  <label>
                    <strong>Manufacturer:</strong>
                  </label>
                  <input
                    type="text"
                    value={vehicleResult.manufacturer}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    id="manufacturer"
                  />
                </div>
                <div>
                  <label>
                    <strong>Manufacturer Location:</strong>
                  </label>
                  <input
                    type="text"
                    value={vehicleResult.manufacturer_location}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    id="manufacturer_location"
                  />
                </div>
                <div>
                  <label>
                    <strong>Country of Origin:</strong>
                  </label>
                  <input
                    type="text"
                    value={vehicleResult.country_of_origin}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    id="country_of_origin"
                  />
                </div>
                <div>
                  <label>
                    <strong>Number of Axels:</strong>
                  </label>
                  <input
                    type="text"
                    value={vehicleResult.number_of_axels}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    id="number_of_axels"
                  />
                </div>
                <div>
                  <label>
                    <strong>Weight:</strong>
                  </label>
                  <input
                    type="text"
                    value={vehicleResult.weight}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    id="weight"
                  />
                </div>
                <div>
                  <label>
                    <strong>Fuel Type:</strong>
                  </label>
                  <input
                    type="text"
                    value={vehicleResult.fuel_type}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    id="fuel_type"
                  />
                </div>
                <div>
                  <label>
                    <strong>Drive Type:</strong>
                  </label>
                  <input
                    type="text"
                    value={vehicleResult.drive_type}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    id="drive_type"
                  />
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-2">Additional Notes</h3>
                <textarea
                  className="w-full h-32 p-4 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none resize-none"
                  value={vehicleResult.notes}
                  placeholder="No notes"
                  readOnly={false}
                  id="notes"
                ></textarea>
                <div className="flex justify-around">
                  <button
                    className="py-2 px-6 bg-green-400 hover:bg-green-600 text-white rounded"
                    onClick={vehicleChangeUpload}
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
        </>
      ) : (
        <>
          <AddCar setAddCar={setAddCar} addRef={addRef} />
        </>
      )}
      <Toaster />
    </>
  );
}

export default CarImageWithInput;
