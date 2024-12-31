import prisma from "@/database/db";
import { NextRequest,NextResponse } from "next/server";

export  async function GET(req:NextRequest,{ params }: { params: Promise<{ recipeId: string }> }) {
    try{
    const  recipeId  = (await params).recipeId
    const recipe = await prisma.recipe.findUnique({
        where:{
            id:Number(recipeId)
        }
    })
    const user = await prisma.user.findUnique({
        where:{
            id:recipe?.userId
        }
    })
    return  NextResponse.json({recipe:recipe,user:user})
    }catch(err){
        console.log(err)
    }
}