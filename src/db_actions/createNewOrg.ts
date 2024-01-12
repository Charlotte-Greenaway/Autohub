const createNewOrg = (db:any, org:any) => {
    return new Promise((resolve, reject) => {
        // Check if the VIN already exists in the database
        db.get("SELECT org_number FROM organisation WHERE org_name = ?", [org.org_name], (err:any, row:any) => {
            if (err) {
                reject("error");
                return;
            }

            if (row) {
                resolve("error");
                return;
            }

            const query = `
                INSERT INTO organisation (org_name, org_number, org_address)
                VALUES (?, ?, ?);
            `;

            const params = [
                org.org_name,
                org.org_number,
                org.org_address,
            ];

            db.run(query, params, function(err:any) {
                if (err) {
                    reject("error");
                    return;
                }
                resolve("success");
            });
        });
    });
};

export default createNewOrg;