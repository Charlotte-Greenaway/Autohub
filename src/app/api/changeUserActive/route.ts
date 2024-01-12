import { NextResponse, NextRequest } from "next/server";
import connectToDb from '@/db_actions/db';
import updateActiveStatus from "@/db_actions/user_actions/updateActiveStatus";


export async function POST(request: NextRequest) {
    try{
        const req = await request.json();
        const email = req.email;
        const newStatus = req.newStatus;
        const db = await connectToDb();
        const vehicleSuccess = await updateActiveStatus(db, email, newStatus);

        return NextResponse.json({ db: vehicleSuccess, status:500 });
        
    } catch (error) {
        console.log("error",error);
        return NextResponse.json({ message: "error", status: 500 });
    }
}