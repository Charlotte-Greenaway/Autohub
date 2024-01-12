import { NextResponse, NextRequest } from "next/server";
import {cookies} from 'next/headers'
import connectToDb from '@/db_actions/db';
import loginUser from "@/db_actions/user_actions/loginUser";
import setJwtToken from "@/db_actions/user_actions/setJwtToken";
import jwt from 'jsonwebtoken'
import crypto from 'crypto'


const generateSecretKey = (length:any) => {
    return crypto.randomBytes(length).toString('hex');
}

export async function POST(request: NextRequest) {
    try{
        const req = await request.json();
        const email = req.email;
        const password = req.password;
        const db = await connectToDb();
        const loginSuccess:any = await loginUser(db, email, password);
        console.log(loginSuccess.status)
        if(loginSuccess.status=="success"){
            const secretKeyGen = await generateSecretKey(32);
            const token = jwt.sign({ userId: email },secretKeyGen , { expiresIn: '7d' });
            const success = await setJwtToken(db, email, secretKeyGen)
            if(success=="success"){
                cookies().set('sessionToken', token, { secure: true, httpOnly: true })
                cookies().set('email', email, { secure: true, httpOnly: true })
                return NextResponse.json({ value: loginSuccess, permissions:loginSuccess.permission_level, token:token, status:200 });
            }else{
                return NextResponse.json({ value: "error", status: 500 });
            }
            
        }else{
            return NextResponse.json({ value: "error", status: 500 });
        }
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "error", status: 500 });
    }
}