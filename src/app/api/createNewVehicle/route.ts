import { NextResponse, NextRequest } from "next/server";
import connectToDb from '@/db_actions/db';
import createCarEntry from "@/db_actions/vehicle_actions/createVehicleEntry";



export async function POST(request: NextRequest) {
    try{
        const req = await request.json();
        const carDetails = req.carDetails;
        const db = await connectToDb();
        const vehicleSuccess = await createCarEntry(db, carDetails);

        return NextResponse.json({ db: vehicleSuccess, status:500 });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "error", status: 500 });
    }
}