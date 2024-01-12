const getAllUsers = (db:any) => {
    return new Promise((resolve, reject) => {
        // Check if the VIN already exists in the database
        db.all("SELECT password_reset_required, contact_number, email, isActive, job_title, first_name, last_name, emergency_contact_address, emergency_contact_name, emergency_contact_number, permission_level FROM users", (err:any, row:any) => {
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



export default getAllUsers;