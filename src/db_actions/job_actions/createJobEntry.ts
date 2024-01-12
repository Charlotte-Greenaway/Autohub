const createJobEntry = (db:any, jobDetails:any) => {
    return new Promise((resolve, reject) => {
        // Query the last wip entry from the jobs table
        db.get("SELECT wip FROM jobs ORDER BY id DESC LIMIT 1", [], (err:any, row:any) => {
            if (err) {
                reject("error");
                return;
            }

            let newWip:String;
            if (row) {
                // Extract the number part of the WIP and increment it
                const lastWipNumber = parseInt(row.wip.replace('WIP', ''));
                newWip = `WIP${(lastWipNumber + 1).toString().padStart(5, '0')}`;
            } else {
                // If no entries, start with WIP00002
                newWip = 'WIP00001';
            }

            // Insert the new entry into the jobs table
            const { reg, vin, assignee, notes, estimated_cost, estimated_hours, date_checked_in, date_finished, client_contact_name, client_contact_email, client_contact_phone, actual_cost, actual_hours } = jobDetails;
            const sql = `INSERT INTO jobs (wip, reg, vin, assignee, notes, estimated_cost, estimated_hours, date_checked_in, date_finished, client_contact_name, client_contact_email, client_contact_phone, actual_cost, actual_hours) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const params = [newWip, reg, vin, assignee, notes, estimated_cost, estimated_hours, date_checked_in, date_finished, client_contact_name, client_contact_email, client_contact_phone, actual_cost, actual_hours];

            db.run(sql, params, function(err:any) {
                if (err) {
                    reject("erroe");
                    return;
                }
                resolve(`Entry created with WIP: ${newWip}`);
            });
        });
    });
};

export default createJobEntry;