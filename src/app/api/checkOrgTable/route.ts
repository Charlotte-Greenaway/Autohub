import { NextResponse, NextRequest } from "next/server";
import checkOrganisationTableExists from "@/db_actions/checkOrgDb";


export async function GET() {
    try{
        const exists = await checkOrganisationTableExists();
        return NextResponse.json({ exists: exists, status:200 });
        
    } catch (error) {
        console.log("error",error);
        return NextResponse.json({ message: "error", status: 500 });
    }
}