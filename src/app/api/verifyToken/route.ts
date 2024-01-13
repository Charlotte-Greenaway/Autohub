import { NextResponse, NextRequest } from "next/server";
import connectToDb from '@/db_actions/db';
import getJwtToken from "@/db_actions/user_actions/getJwtToken";
import  jwt  from "jsonwebtoken";



export async function POST(request: NextRequest) {
    try{
        const req = await request.json();
        const tokenClient = req.token;
        const email = req.email;
        const db = await connectToDb();
        const secretToken:any = await getJwtToken(db, email);
        if (secretToken!=="error"){
            const decoded = await jwt.verify(tokenClient, secretToken.secretKey);  
            return NextResponse.json({ db: decoded, status:200 });
        }else{
            return NextResponse.json({ message: "unauthorised", status: 401 });
        }
        
        
    } catch (error) {
        console.log("error",error);
        return NextResponse.json({ message: "unauthorised", status: 401 });
    }
}