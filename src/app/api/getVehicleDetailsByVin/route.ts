import { NextResponse, NextRequest } from "next/server";
import connectToDb from '@/db_actions/db';
import getVehicleEntryByVin from "@/db_actions/vehicle_actions/getVehicleDetailsByVin";



export async function POST(request: NextRequest) {
    try{
        const req = await request.json();
        const vin = req.reg;
        const db = await connectToDb();
        const vehicleSuccess = await getVehicleEntryByVin(db, vin);

        return NextResponse.json({ vehicle: vehicleSuccess, status:500 });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "error", status: 500 });
    }
}