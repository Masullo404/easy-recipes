import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import prisma from "@/database/db";

export const dynamic = 'force-dynamic'

export async function GET() {
    try{
    const session = await getServerSession(options)
    if(!session) {
        return NextResponse.json(null,{status:401})
    }
    
    const user = await prisma.user.findUnique({
        where:{
            email:String(session?.user?.email)
        }
    })
    if(!user) throw new Error('User not identified')
    return NextResponse.json(user,{status:200})
    }catch(err){
        console.log("An server error ocurred: "+err)
        return NextResponse.json(null,{status:401})
    }
}