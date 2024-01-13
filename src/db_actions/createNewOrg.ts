const createNewOrg = (db:any, org:any) => {
    return new Promise((resolve, reject) => {
        const query4 = `
        CREATE TABLE IF NOT EXISTS organisation (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            org_name TEXT,
            org_number TEXT,
            org_address TEXT
        );
    `; // Your SQL query
        db.run(query4, (err:any) => {
            if (err) {
            console.error(err.message);
            reject("error")
            }else{
                db.get("SELECT org_number FROM organisation WHERE org_name = ?", [org.org_name], (err:any, row:any) => {
                    if (err) {
                        console.log(err)
                        reject("error");
                        return;
                    }
        
                    if (row) {
                        console.log(row)
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
                            console.log(err)
                            reject("error");
                            return;
                        }
                        resolve("success");
                    });
                });
            }
        }); 
        
    });
};

export default createNewOrg;