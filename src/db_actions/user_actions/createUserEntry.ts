const bcrypt = require("bcrypt");

const createUserEntry = (db: any, user: any) => {
  return new Promise((resolve, reject) => {
    // Check if the VIN already exists in the database
    db.get(
      "SELECT first_name FROM users WHERE email = ?",
      [user.email],
      (err: any, row: any) => {
        if (err) {
          console.log(err);
          reject("error");
          return;
        }

        if (row) {
          resolve("exists");
          return;
        }
        bcrypt.genSalt(10, function (saltErr: any, salt: any) {
          if (saltErr) {
            console.error("Salt generation error:", saltErr);
            reject("error");
            return;
          }
          bcrypt.hash(user.password, salt, function (err: any, hash: any) {
            // Store hash in your password DB.
            if (err) {
              reject("error");
            } else {
              const query = `
                INSERT INTO users (first_name, last_name, email, password, hasLoggedIn, isActive, permission_level, job_title, contact_number, emergency_contact_name, emergency_contact_number, emergency_contact_address, password_reset_required)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `;
              const params = [
                user.first_name,
                user.last_name,
                user.email,
                hash,
                false,
                true,
                user.permission_level,
                user.job_title,
                user.contact_number,
                user.emergency_contact_name,
                user.emergency_contact_number,
                user.emergency_contact_address,
                false,
              ];

              db.run(query, params, function (err: any) {
                if (err) {
                  console.log(err);
                  reject("error");
                  return;
                }
                resolve("success");
              });
            }
          });
        });
      }
    );
  });
};

export default createUserEntry;
