const bcrypt = require("bcrypt");

const updatePassword = (db: any, email: any, password: any) => {
  return new Promise((resolve, reject) => {
    // Check if the VIN already exists in the database
    db.get(
      "SELECT first_name FROM users WHERE email = ?",
      [email],
      (err: any, row: any) => {
        if (err) {
          console.log(err);
          reject("error");
          return;
        } else if (row) {
          bcrypt.genSalt(10, function (saltErr: any, salt: any) {
            if (saltErr) {
              console.error("Salt generation error:", saltErr);
              reject("error");
              return;
            }
            bcrypt.hash(password, salt, function (err: any, hash: any) {
              // Store hash in your password DB.
              if (err) {
                console.log(err)
                reject("error");
              } else {
                const updateQuery = `UPDATE users SET 
                password = ?
                WHERE email = ?`;

                db.run(updateQuery, [hash, email], (updateErr: any) => {
                  if (updateErr) {
                    console.log(updateErr);
                    reject("error");
                    return;
                  }
                  resolve("success");
                });
              }
            });
          });
        } else {
          resolve("error");
          return;
        }
      }
    );
  });
};

export default updatePassword;
