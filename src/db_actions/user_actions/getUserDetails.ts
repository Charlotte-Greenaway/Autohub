const getUserDetails = (db:any, email:any) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT first_name, last_name, email, permission_level, job_title, contact_number, emergency_contact_name, emergency_contact_number, emergency_contact_address FROM users WHERE email = ?", [email], (err:any, row:any) => {
            if (err) {
                reject("error");
                return;
            } else if (row) {
                console.log(row)
                resolve(row);
                return;
            } else {
                resolve("error");
                return;
            }
        });
    });
};

export default getUserDetails;