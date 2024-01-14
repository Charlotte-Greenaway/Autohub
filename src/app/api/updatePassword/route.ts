import { NextResponse, NextRequest } from "next/server";
import connectToDb from '@/db_actions/db';
import updatePassword from "@/db_actions/user_actions/updatePassword";
import {cookies} from 'next/headers'

export async function POST(request: NextRequest) {
    try{
        const email:any = await cookies().get("email")
        const req = await request.json();
        const password = req.password;
        const db = await connectToDb();
        const userSuccess = await updatePassword(db, email.value,password);
        return NextResponse.json({ db: userSuccess, status:200 });
        
    } catch (error) {
        console.log("error",error);
        return NextResponse.json({ message: "error", status: 500 });
    }
}