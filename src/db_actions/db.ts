import path from 'path';
import createCarsTable from './createVehicleTable';

const dbDirectory = path.resolve("../databases");
const dbPath = path.join(dbDirectory, 'vehicles.db');

const connectToDb = async () => {
    try {
        //ensures all tables created and returns db connection
        const db = await createCarsTable(dbPath);
        // Additional initialization or operations with db can be done here
        return db;
    } catch (err:any) {
        console.error('Error connecting to the database:', err.message);
        throw err; // Or handle the error as needed
    }
};

export default connectToDb;