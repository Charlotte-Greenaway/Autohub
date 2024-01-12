const getJwtToken = (db:any, email:any) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT secretKey FROM users WHERE email = ?", [email], (err:any, row:any) => {
            if (err) {
                reject("errorr");
                return;
            } else if (row) {
                resolve(row);
                return;
            } else {
                resolve("error");
                return;
            }
        });
    });
};

export default getJwtToken;