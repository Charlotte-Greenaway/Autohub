const getJobsByVin = (db:any, wip:any) => {
    return new Promise((resolve, reject) => {
        // Check if the VIN already exists in the database
        db.all("SELECT * FROM jobs WHERE wip LIKE ?", `%${wip}%`, (err:any, row:any) => {
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

export default getJobsByVin;