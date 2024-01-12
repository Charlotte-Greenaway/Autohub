import { NextResponse, NextRequest } from "next/server";
import connectToDb from '@/db_actions/db';
import updateUserEntry from "@/db_actions/user_actions/updateUserEntry";



export async function POST(request: NextRequest) {
    try{
        const req = await request.json();
        const newUser = req.user;
        const db = await connectToDb();
        const vehicleSuccess = await updateUserEntry(db, newUser);

        return NextResponse.json({ db: vehicleSuccess, status:500 });
        
    } catch (error) {
        console.log("error",error);
        return NextResponse.json({ message: "error", status: 500 });
    }
}