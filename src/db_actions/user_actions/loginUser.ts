const loginUser = (db: any, email:any, password:any) => {
    return new Promise((resolve, reject) => {
      // Check if the VIN already exists in the database
      db.get(
        "SELECT password, permission_level, isActive FROM users WHERE email = ?",
        [email],
        (err: any, row: any) => {
          if (err) {
            resolve({status:"error"});
            return;
          }
  
          if (!row) {
            resolve({status:"error"});
            return;
          }
          if(row.password===password && row.isActive==true){
            resolve({status:"success"});
            return;
          }
          
        }
      );
    });
  };
  
  export default loginUser;
  