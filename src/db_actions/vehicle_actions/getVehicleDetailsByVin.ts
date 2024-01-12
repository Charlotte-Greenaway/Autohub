const getVehicleEntryByVin = (db:any, vin:any) => {
    return new Promise((resolve, reject) => {
        // Check if the VIN already exists in the database
        db.get("SELECT * FROM cars WHERE vin = ?", vin, (err:any, row:any) => {
            if (err) {
                reject("error");
                return;
            }

            else if (row) {
                resolve(row);
                return row;
            }
            else{
                resolve("missing")
            }

        
        });
    });
};

export default getVehicleEntryByVin;