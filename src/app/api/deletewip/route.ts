import { NextResponse, NextRequest } from "next/server";
import connectToDb from '@/db_actions/db';
import deletewip from "@/db_actions/job_actions/deletewip";



export async function POST(request: NextRequest) {
    try{
        const req = await request.json();
        const wip = req.wip;
        const db = await connectToDb();
        const vehicleSuccess = await deletewip(db, wip);

        return NextResponse.json({ vehicle: vehicleSuccess, status:500 });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "error", status: 500 });
    }
}