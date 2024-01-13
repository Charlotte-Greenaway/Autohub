import sqlite3 from "sqlite3";
import path from 'path';
const dbDirectory = path.resolve("../databases");
const dbPath = path.join(dbDirectory, 'vehicles.db');


const checkOrganisationTableExists = () => {
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

        // Check if 'organisation' table exists
        const query = `
          SELECT name 
          FROM sqlite_master 
          WHERE type='table' AND name='organisation';
        `;

        db.get(query, (err, row) => {
          if (err) {
            console.error(err.message);
            reject(false);
          } else {
            if (row) {
              //console.log(row)
              resolve(true); // Table exists
            } else {
              resolve(false); // Table does not exist
            }
          }
        });
      }
    );
  });
};

export default checkOrganisationTableExists;
