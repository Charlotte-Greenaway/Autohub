import { NextResponse } from "next/server";
import connectToDb from '@/db_actions/db';
import getAllUsers from "@/db_actions/user_actions/getAllUsers";



export async function POST() {
    try{

        const db = await connectToDb();
        const users = await getAllUsers(db);

        return NextResponse.json({ users: users, status:500 });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "error", status: 500 });
    }
}