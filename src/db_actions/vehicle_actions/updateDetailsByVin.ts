const updateCarEntry = (db:any, carDetails:any) => {
    return new Promise((resolve, reject) => {
        // Check if the VIN already exists in the database
        db.get("SELECT reg FROM cars WHERE vin = ?", [carDetails.vin], (err:any, row:any) => {
            if (err) {
                reject("error");
                return;
            } else if (row) {
                const updateQuery = `UPDATE cars SET 
                    reg = ?, 
                    vin = ?, 
                    engine_number = ?, 
                    transmission_number = ?, 
                    date_of_manufacture = ?, 
                    date_of_registration = ?, 
                    colour = ?, 
                    paint_code = ?, 
                    warranty_start_date = ?, 
                    warranty_end_date = ?, 
                    recalls = ?, 
                    make = ?, 
                    model = ?, 
                    manufacturer = ?, 
                    manufacturer_location = ?, 
                    country_of_origin = ?, 
                    number_of_axels = ?, 
                    weight = ?, 
                    fuel_type = ?, 
                    drive_type = ?, 
                    notes = ? 
                    WHERE vin = ?`;

                db.run(updateQuery, [
                    carDetails.reg, 
                    carDetails.vin, 
                    carDetails.engine_number, 
                    carDetails.transmission_number, 
                    carDetails.date_of_manufacture, 
                    carDetails.date_of_registration, 
                    carDetails.colour, 
                    carDetails.paint_code, 
                    carDetails.warranty_start_date, 
                    carDetails.warranty_end_date, 
                    carDetails.recalls, 
                    carDetails.make, 
                    carDetails.model, 
                    carDetails.manufacturer, 
                    carDetails.manufacturer_location, 
                    carDetails.country_of_origin, 
                    carDetails.number_of_axels, 
                    carDetails.weight, 
                    carDetails.fuel_type, 
                    carDetails.drive_type, 
                    carDetails.notes,
                    carDetails.vin // Where condition
                ], (updateErr: any) => {
                    if (updateErr) {
                        reject("update error");
                        return;
                    }
                    resolve("success");
                });
            } else {
                resolve("error");
                return;
            }
        });
    });
};

export default updateCarEntry;