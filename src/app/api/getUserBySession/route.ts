import { getServerSession } from "next-auth";
import {  NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import prisma from "@/database/db";

export async function GET() {
    try{
    const session = await getServerSession(options)
    const user = await prisma.user.findUnique({
        where:{
            email:String(session?.user?.email)
        }
    })
    return NextResponse.json(user)
    }catch(err){
        console.log(err)
    }
}