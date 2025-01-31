import { getServerSession, Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
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
            email:String(session.user.email)
        }
    })
    if(!user) throw new Error('User not identified')
    return NextResponse.json(user,{status:200})
    }catch(err){
        console.log("An server error ocurred: "+err)
        return NextResponse.json(null,{status:401})
    }
}
export async function POST(req:NextRequest) {
    try {
        const {session}:{session:Session} = await req.json()
        if(!session) return NextResponse.json(null,{status:401})
        const user = await prisma.user.findUnique({
            where:{
                email:String(session.user.email)
            }
        })
        if(!user) return NextResponse.json(null,{status:401})
        return NextResponse.json(user)
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }
}