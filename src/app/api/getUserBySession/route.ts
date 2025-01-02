import { getServerSession } from "next-auth";
import {  NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import prisma from "@/database/db";

export const dynamic = 'force-dynamic'

export async function GET() {
    try{
    const session = await getServerSession(options)
    if(!session) throw new Error('User not authenticated')
    const user = await prisma.user.findUnique({
        where:{
            email:String(session?.user?.email)
        }
    })
    if(!user) throw new Error('User not identified')
    return NextResponse.json(user)
    }catch(err){
        console.log(err)
        return NextResponse.json({error:err})
    }
}