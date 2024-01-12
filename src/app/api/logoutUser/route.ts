import { NextResponse, NextRequest } from "next/server";
import {cookies} from 'next/headers'




export async function POST(request: NextRequest) {
    try{
        cookies().delete('email');
        cookies().delete('sessionToken');
        return NextResponse.json({ message: "error", status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "error", status: 500 });
    }
}