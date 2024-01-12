import { NextResponse, NextRequest } from "next/server";
import connectToDb from '@/db_actions/db';
import getJobsByReg from "@/db_actions/job_actions/getJobsByReg";



export async function POST(request: NextRequest) {
    try{
        const req = await request.json();
        const reg = req.reg;
        const db = await connectToDb();
        const vehicleSuccess = await getJobsByReg(db, reg);

        return NextResponse.json({ vehicle: vehicleSuccess, status:500 });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "error", status: 500 });
    }
}