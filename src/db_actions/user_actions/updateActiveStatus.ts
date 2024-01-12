const updateActiveStatus = (db:any, email:any, newStatus:any) => {
    return new Promise((resolve, reject) => {
        // Check if the VIN already exists in the database
        db.get("SELECT first_name FROM users WHERE email = ?", [email], (err:any, row:any) => {
            if (err) {
                console.log(err)
                reject("error");
                return;
            } else if (row) {
                const updateQuery = `UPDATE users SET 
                isActive = ?
                WHERE email = ?`;

                db.run(updateQuery, [
                    newStatus,
                    email
                ], (updateErr: any) => {
                    if (updateErr) {
                        console.log(updateErr)
                        reject("error");
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

export default updateActiveStatus;