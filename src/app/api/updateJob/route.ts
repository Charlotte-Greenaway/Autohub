import { NextResponse, NextRequest } from "next/server";
import connectToDb from '@/db_actions/db';
import updateJob from "@/db_actions/job_actions/updateJob";



export async function POST(request: NextRequest) {
    try{
        const req = await request.json()
        const jobDetails = req.jobDetails;
        const db = await connectToDb();
        const vehicleSuccess = await updateJob(db, jobDetails);

        return NextResponse.json({ response: vehicleSuccess, status:500 });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "error", status: 500 });
    }
}