const getVehicleEntry = (db:any, reg:any) => {
    return new Promise((resolve, reject) => {
        // Check if the VIN already exists in the database
        db.get("SELECT * FROM cars WHERE reg = ?", reg, (err:any, row:any) => {
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

export default getVehicleEntry;