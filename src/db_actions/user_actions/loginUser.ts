const bcrypt = require("bcrypt");

const loginUser = (db:any, email:any, password:any) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT password, permission_level, isActive FROM users WHERE email = ?", [email], (err:any, row:any) => {
      if (err) {
        reject({ status: "error", message: "Database error" });
        return;
      }

      if (!row) {
        reject({ status: "error", message: "Invalid credentials" });
        return;
      }

      bcrypt.compare(password, row.password, (compareErr:any, match:any) => {
        if (compareErr) {
          reject({ status: "error", message: "Error comparing password" });
          return;
        }

        if (match && row.isActive) {
          resolve({ status: "success", permission_level: row.permission_level });
        } else {
          reject({ status: "error", message: "Invalid credentials" });
        }
      });
    });
  });
};

export default loginUser;
