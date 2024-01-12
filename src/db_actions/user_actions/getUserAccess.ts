const getUserAccess = (db:any, email:any) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT permission_level FROM users WHERE email = ?", [email], (err:any, row:any) => {
            if (err) {
                reject("error");
                return;
            } else if (row) {
                console.log(row)
                resolve(row.permission_level);
                return;
            } else {
                resolve("error");
                return;
            }
        });
    });
};

export default getUserAccess;