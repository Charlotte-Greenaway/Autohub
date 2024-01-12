const updateUserEntry = (db:any, userDetails:any) => {
    return new Promise((resolve, reject) => {
        // Check if the VIN already exists in the database
        db.get("SELECT first_name FROM users WHERE email = ?", [userDetails.email], (err:any, row:any) => {
            if (err) {
                console.log(err)
                reject("error");
                return;
            } else if (row) {
                const updateQuery = `UPDATE users SET 
                first_name = ?,
                last_name = ?,
                job_title = ?,
                permission_level = ?,
                contact_number = ?,
                emergency_contact_name = ?,
                emergency_contact_number = ?,
                emergency_contact_address = ?
                WHERE email = ?`;

                db.run(updateQuery, [
                    userDetails.first_name,
                    userDetails.last_name,
                    userDetails.job_title,
                    userDetails.permission_level,
                    userDetails.contact_number,
                    userDetails.emergency_contact_name,
                    userDetails.emergency_contact_number,
                    userDetails.emergency_contact_address,
                    userDetails.email
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

export default updateUserEntry;