import { NextResponse, NextRequest } from "next/server";
import connectToDb from '@/db_actions/db';
import createNewOrg from "@/db_actions/createNewOrg";



export async function POST(request: NextRequest) {
    try{
        const req = await request.json();
        const org = req.org;
        const db = await connectToDb();
        const vehicleSuccess = await createNewOrg(db, org);

        return NextResponse.json({ db: vehicleSuccess, status:500 });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "error", status: 500 });
    }
}