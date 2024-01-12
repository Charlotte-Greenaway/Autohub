import { NextResponse,NextRequest } from "next/server";
import connectToDb from '@/db_actions/db';
import getUserAccess from "@/db_actions/user_actions/getUserAccess";
import {cookies} from 'next/headers'


export async function POST(request: NextRequest) {
    try{
        const email:any = await cookies().get("email")
        const db = await connectToDb();
        const users = await getUserAccess(db, email.value);
        if(users=="error"){
            return NextResponse.json({ message: "error", status: 500 });
        }else{
            return NextResponse.json({ permissions: users, status:200 });
        }
        
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "error", status: 500 });
    }
}