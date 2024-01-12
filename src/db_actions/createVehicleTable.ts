import sqlite3 from "sqlite3";

const createCarsTable = (dbPath: any) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(
      dbPath,
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) {
          console.error(err.message);
          reject(err);
          return;
        }

        console.log("Connected to the SQLite database.");
        //db.run("DROP TABLE users");
        const query = `
        CREATE TABLE IF NOT EXISTS cars (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            reg TEXT UNIQUE,
            vin TEXT UNIQUE,
            engine_number TEXT,
            transmission_number TEXT,
            date_of_manufacture TEXT,
            date_of_registration TEXT,
            colour TEXT,
            paint_code TEXT,
            warranty_start_date TEXT,
            warranty_end_date TEXT,
            recalls TEXT,
            make TEXT,
            model TEXT,
            manufacturer TEXT,
            manufacturer_location TEXT,
            country_of_origin TEXT,
            number_of_axels INTEGER,
            weight REAL,
            fuel_type TEXT,
            drive_type TEXT,
            notes TEXT
        );
    `; // Your SQL query
        const query2 = `
        CREATE TABLE IF NOT EXISTS jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            wip TEXT UNIQUE,
            reg TEXT,
            vin TEXT,
            assignee TEXT,
            notes TEXT,
            estimated_cost TEXT,
            estimated_hours TEXT,
            date_checked_in TEXT,
            date_finished TEXT,
            client_contact_name TEXT,
            client_contact_email TEXT,
            client_contact_phone TEXT,
            actual_cost TEXT,
            actual_hours TEXT
        );
    `;
        const query4 = `
        CREATE TABLE IF NOT EXISTS organisation (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            org_name TEXT,
            org_number TEXT,
            org_address TEXT
        );
    `; // Your SQL query
    const query3 = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            secretKey TEXT,
            isActive BOOL,
            first_name TEXT,
            last_name TEXT,
            permission_level TEXT,
            email TEXT UNIQUE,
            password TEXT,
            hasLoggedIn BOOL,
            job_title TEXT,
            contact_number TEXT,
            emergency_contact_name TEXT,
            emergency_contact_number TEXT,
            emergency_contact_address TEXT,
            password_reset_required TEXT
        );
    `; // Your SQL query

        db.run(query, (err) => {
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            db.run(query2, (err) => {
              if (err) {
                console.error(err.message);
                reject(err);
              } else {
                db.run(query3, (err) => {
                  if (err) {
                    console.error(err.message);
                    reject(err);
                  } else {
                    db.run(query4, (err) => {
                      if (err) {
                        console.error(err.message);
                        reject(err);
                      } else {
                        resolve(db);
                      }
                    });
                    resolve(db);
                  }
                });
                resolve(db);
              }
            });
          }
        });
      }
    );
  });
};

export default createCarsTable;
