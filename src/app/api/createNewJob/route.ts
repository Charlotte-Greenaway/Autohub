import { NextResponse, NextRequest } from "next/server";
import connectToDb from '@/db_actions/db';
import createJobEntry from "@/db_actions/job_actions/createJobEntry";



export async function POST(request: NextRequest) {
    try{
        const req = await request.json();
        const jobDetails = req.jobDetails;
        const db = await connectToDb();
        const vehicleSuccess = await createJobEntry(db, jobDetails);

        return NextResponse.json({ response: vehicleSuccess, status:500 });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "error", status: 500 });
    }
}