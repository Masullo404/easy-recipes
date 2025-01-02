import prisma from "@/database/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export const dynamic = 'force-dynamic'

export async function GET() {
    try{
    const session = await getServerSession(options)
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
            createdAt:"desc"
        }
    })
    return NextResponse.json(recentRecipes,{status:200})
    } catch(err){
        console.log(err)
        return NextResponse.json({error:err})
    }
}