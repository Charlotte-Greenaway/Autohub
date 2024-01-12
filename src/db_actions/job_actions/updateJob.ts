const updateJob = (db: any, jobDetails: any) => {
  return new Promise((resolve, reject) => {
    // Check if the VIN already exists in the database
    db.get(
      "SELECT reg FROM jobs WHERE wip = ?",
      [jobDetails.wip],
      (err: any, row: any) => {
        if (err) {
            console.log(err)
          reject("error");
          return;
        } else if (row) {
            console.log(row)
          const updateQuery = `UPDATE jobs SET 
                    reg = ?, 
                    vin = ?, 
                    assignee = ?,
                    notes = ?,
                    estimated_cost  = ?,
                    estimated_hours  = ?,
                    date_checked_in  = ?,
                    date_finished  = ?,
                    client_contact_name  = ?,
                    client_contact_email  = ?,
                    client_contact_phone  = ?,
                    actual_cost  = ?,
                    actual_hours  = ?
                    WHERE wip = ?`;

          db.run(
            updateQuery,
            [
                jobDetails.reg,
                jobDetails.vin,
                jobDetails.assignee,
                jobDetails.notes,
                jobDetails.estimated_cost,
                jobDetails.estimated_hours,
                jobDetails.date_checked_in,
                jobDetails.date_finished,
                jobDetails.client_contact_name,
                jobDetails.client_contact_email,
                jobDetails.client_contact_phone,
                jobDetails.actual_cost,
                jobDetails.actual_hours,
                jobDetails.wip
            ],
            (updateErr: any) => {
              if (updateErr) {
                console.log(updateErr)
                reject("error");
                return;
              }
              resolve(("Successfully Updated "+jobDetails.wip));
            }
          );
        } else {
          resolve("error");
          return;
        }
      }
    );
  });
};

export default updateJob;
