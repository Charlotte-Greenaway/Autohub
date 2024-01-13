import { NextResponse,NextRequest } from "next/server";
import connectToDb from '@/db_actions/db';
import getUserDetails from "@/db_actions/user_actions/getUserDetails";
import {cookies} from 'next/headers'


export async function POST(request: NextRequest) {
    try{
        const email:any = await cookies().get("email")
        const db = await connectToDb();
        const user = await getUserDetails(db, email.value);
        if(user=="error"){
            return NextResponse.json({ message: "error", status: 500 });
        }else{
            return NextResponse.json({ permissions: user, status:200 });
        }
        
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "error", status: 500 });
    }
}