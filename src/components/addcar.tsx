import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

const AddCar = ({ setAddCar, addRef }: any) => {
  const [newVehicle, setNewVehicle] = useState<any>({
    reg: null,
    vin: null,
    engine_number: null,
    transmission_number: null,
    date_of_manufacture: null,
    date_of_registration: null,
    colour: null,
    paint_code: null,
    warranty_start_date: null,
    warranty_end_date: null,
    recalls: null,
    make: null,
    model: null,
    manufacturer: null,
    manufacturer_location: null,
    country_of_origin: null,
    number_of_axels: 0,
    weight: null,
    fuel_type: null,
    drive_type: null,
  });
  const handleCancel = () => {
    setAddCar(false);
  };
  const handleVehicleChange = (e: any) => {
    const { id, value } = e.target;
    if((id=="reg" && value.length<=7)|| (id=="vin" && value.length<=17)){
        setNewVehicle((prevState: any) => ({
            ...prevState,
            [id]: value.toUpperCase(),
          }));
    }else if(id!=="reg"&&id!=="vin"){
        setNewVehicle((prevState: any) => ({
            ...prevState,
            [id]: value,
          }));
    }
    
  };
  const submitDetails = async() => {
    const response = await axios.post("/api/createNewVehicle", {
        carDetails: newVehicle,
      });
      return response;
  }
  const handleSubmit = async(e:any) =>{
    await e.preventDefault();
    function isAlphanumeric(value: string) {
        const pattern = /^[a-zA-Z0-9]+$/;
        return pattern.test(value);
      }
      function isValidDate(value: any) {
        const pattern = /^\d{4}-\d{2}-\d{2}$/;
        return pattern.test(value);
      }
    if(
        (newVehicle.reg.length<=7 && isAlphanumeric(newVehicle.reg))
      &&
      (isValidDate(newVehicle.date_of_manufacture)||newVehicle.date_of_manufacture==null)
      &&
      (isValidDate(newVehicle.warranty_start_date)||newVehicle.warranty_start_date==null)
      &&
      (isValidDate(newVehicle.date_of_registration)||newVehicle.ate_of_registration==null)
      &&
      (isValidDate(newVehicle.warranty_end_date)||newVehicle.warranty_end_date==null)
    ){

        const response = await submitDetails();
        if(response.data.db=="error"){
            toast.error("Could not upload entry")
        }
        if(response.data.db=="success"){
            toast.success("Record updated!")
            setNewVehicle({
                reg: null,
                vin: null,
                engine_number: null,
                transmission_number: null,
                date_of_manufacture: null,
                date_of_registration: null,
                colour: null,
                paint_code: null,
                warranty_start_date: null,
                warranty_end_date: null,
                recalls: null,
                make: null,
                model: null,
                manufacturer: null,
                manufacturer_location: null,
                country_of_origin: null,
                number_of_axels: 0,
                weight: null,
                fuel_type: null,
                drive_type: null,
              })
        }
        if(response.data.db=="exists"){
            toast.error("This VIN is already on record")
        }

    }else{
        if(
            !(isValidDate(newVehicle.date_of_manufacture))
            ||
          !(isValidDate(newVehicle.warranty_start_date))
          ||
          !(isValidDate(newVehicle.date_of_registration))
          ||
          !(isValidDate(newVehicle.warranty_end_date))
          ){
            toast.error("Please format date correctly (yyyy-mm-dd)")
          }else{
            toast.error("Please enter valid registration plate (no spaces or special characters and less than 7 characters)")
          }
    }
    
  }
  return (
    <>
      <form ref={addRef} onChange={handleVehicleChange}>
        <div className="bg-white shadow-lg rounded-lg p-4 max-w-2xl mx-auto my-6">
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
                placeholder="AB12 ABC"
                className="w-full p-2 border border-gray-300 rounded-md"
                id="reg"
                value={(newVehicle.reg!==null)?newVehicle.reg:""}
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
                readOnly={false}
                id="vin"
                value={(newVehicle.vin!==null)?newVehicle.vin:""}
                required
              />
            </div>
            <div>
              <label>
                <strong>Engine Number:</strong>
              </label>
              <input
                type="text"
                placeholder="EN123456"
                className="w-full p-2 border border-gray-300 rounded-md"
                id="engine_number"
                value={(newVehicle.engine_number!==null)?newVehicle.engine_number:""}
              />
            </div>
            <div>
              <label>
                <strong>Transmission Number:</strong>
              </label>
              <input
                type="text"
                placeholder="TN123456"
                className="w-full p-2 border border-gray-300 rounded-md"
                id="transmission_number"
                value={(newVehicle.transmission_number!==null)?newVehicle.transmission_number:""}
              />
            </div>
            <div>
              <label>
                <strong>Date of Manufacture:</strong>
              </label>
              <input
                type="date"
                placeholder="yyyy-mm-dd"
                className="w-full p-2 border border-gray-300 rounded-md"
                id="date_of_manufacture"
                value={(newVehicle.date_of_manufacture!==null)?newVehicle.date_of_manufacture:""}
              />
            </div>
            <div>
              <label>
                <strong>Date of Registration:</strong>
              </label>
              <input
                type="date"
                placeholder="yyyy-mm-dd"
                className="w-full p-2 border border-gray-300 rounded-md"
                id="date_of_registration"
                value={(newVehicle.date_of_registration!==null)?newVehicle.date_of_registration:""}
              />
            </div>
            <div>
              <label>
                <strong>Colour:</strong>
              </label>
              <input
                type="text"
                placeholder="red"
                className="w-full p-2 border border-gray-300 rounded-md"
                id="colour"
                value={(newVehicle.colour!==null)?newVehicle.colour:""}
              />
            </div>
            <div>
              <label>
                <strong>Paint Code:</strong>
              </label>
              <input
                type="text"
                placeholder="BL123"
                className="w-full p-2 border border-gray-300 rounded-md"
                id="paint_code"
                value={(newVehicle.paint_code!==null)?newVehicle.paint_code:""}
              />
            </div>
            <div>
              <label>
                <strong>Warranty Start Date:</strong>
              </label>
              <input
                type="date"
                placeholder="yyyy-mm-dd"
                className="w-full p-2 border border-gray-300 rounded-md"
                id="warranty_start_date"
                value={(newVehicle.warranty_start_date!==null)?newVehicle.warranty_start_date:""}
              />
            </div>
            <div>
              <label>
                <strong>Warranty End Date:</strong>
              </label>
              <input
                type="date"
                placeholder="yyyy-mm-dd"
                className="w-full p-2 border border-gray-300 rounded-md"
                id="warranty_end_date"
                value={(newVehicle.warranty_end_date!==null)?newVehicle.warranty_end_date:""}
              />
            </div>
            <div>
              <label>
                <strong>Recalls:</strong>
              </label>
              <input
                type="text"
                placeholder="none"
                className="w-full p-2 border border-gray-300 rounded-md"
                id="recalls"
                value={(newVehicle.recalls!==null)?newVehicle.recalls:""}
              />
            </div>
            <div>
              <label>
                <strong>Make:</strong>
              </label>
              <input
                type="text"
                placeholder="Mercedes"
                className="w-full p-2 border border-gray-300 rounded-md"
                id="make"
                value={(newVehicle.make!==null)?newVehicle.make:""}
                required
              />
            </div>
            <div>
              <label>
                <strong>Model:</strong>
              </label>
              <input
                type="text"
                placeholder="a-class"
                className="w-full p-2 border border-gray-300 rounded-md"
                id="model"
                value={(newVehicle.model!==null)?newVehicle.model:""}
                required
              />
            </div>
            <div>
              <label>
                <strong>Manufacturer:</strong>
              </label>
              <input
                type="text"
                placeholder="Daimler AG"
                className="w-full p-2 border border-gray-300 rounded-md"
                id="manufacturer"
                value={(newVehicle.manufacturer!==null)?newVehicle.manufacturer:""}
              />
            </div>
            <div>
              <label>
                <strong>Manufacturer Location:</strong>
              </label>
              <input
                type="text"
                placeholder="Germany"
                className="w-full p-2 border border-gray-300 rounded-md"
                id="manufacturer_location"
                value={(newVehicle.manufacturer_location!==null)?newVehicle.manufacturer_location:""}
              />
            </div>
            <div>
              <label>
                <strong>Country of Origin:</strong>
              </label>
              <input
                type="text"
                placeholder="UK"
                className="w-full p-2 border border-gray-300 rounded-md"
                id="country_of_origin"
                value={(newVehicle.country_of_origin!==null)?newVehicle.country_of_origin:""}
              />
            </div>
            <div>
              <label>
                <strong>Number of Axels:</strong>
              </label>
              <input
                type="text"
                placeholder="2"
                className="w-full p-2 border border-gray-300 rounded-md"
                id="number_of_axels"
                value={(newVehicle.number_of_axels!==null)?newVehicle.number_of_axels:""}
              />
            </div>
            <div>
              <label>
                <strong>Weight:</strong>
              </label>
              <input
                type="text"
                placeholder="1 tonne"
                className="w-full p-2 border border-gray-300 rounded-md"
                id="weight"
                value={(newVehicle.weight!==null)?newVehicle.weight:""}
              />
            </div>
            <div>
              <label>
                <strong>Fuel Type:</strong>
              </label>
              <input
                type="text"
                placeholder="diesel"
                className="w-full p-2 border border-gray-300 rounded-md"
                id="fuel_type"
                value={(newVehicle.fuel_type!==null)?newVehicle.fuel_type:""}
              />
            </div>
            <div>
              <label>
                <strong>Drive Type:</strong>
              </label>
              <input
                type="text"
                placeholder="FWD"
                className="w-full p-2 border border-gray-300 rounded-md"
                id="drive_type"
                value={(newVehicle.drive_type!==null)?newVehicle.drive_type:""}
              />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">Additional Notes</h3>
            <textarea
              className="w-full h-32 p-4 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none resize-none"
              placeholder="No notes"
              readOnly={false}
              id="notes"
              value={(newVehicle.notes!==null)?newVehicle.notes:""}
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
      <Toaster/>
    </>
  );
};
export default AddCar;
