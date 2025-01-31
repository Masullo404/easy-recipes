import prisma from "@/database/db";
import { NextRequest, NextResponse } from "next/server";
import { Session } from "next-auth";

export const dynamic = 'force-dynamic'

export  async function POST(req:NextRequest) {
    try{
    const {session}:{session:Session} = await req.json()
    if(!session) return NextResponse.json(null,{status:401})
    const user = await prisma.user.findUnique({
        where:{
            email:String(session?.user?.email)
        }
    })
    const recentRecipes = await prisma.recipe.findMany({
        where:{
            userId:Number(user?.id)
        },
        orderBy:{
            createdAt:"asc"
        }
    })
    return NextResponse.json(recentRecipes,{status:200})
    } catch(err){
        console.log(err)
        return NextResponse.json({error:err})
    }
}
