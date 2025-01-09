import prisma from "@/database/db";
import { NextRequest,NextResponse } from "next/server";

export  async function GET(req:NextRequest,{ params }: { params: Promise<{ recipeId: string }> }) {
    try{
    const  recipeId  = (await params).recipeId
    if(!recipeId) return NextResponse.json(null,{status:400})
    const recipe = await prisma.recipe.findUnique({
        where:{
            id:Number(recipeId)
        }
    })
    if(!recipe) return NextResponse.json(null,{status:404})
    const user = await prisma.user.findUnique({
        where:{
            id:recipe?.userId
        }
    })
    if(!user) return NextResponse.json(null,{status:404})
    return  NextResponse.json({recipe:recipe,user:user})
    }catch(err){
        console.log(err)
        return NextResponse.json(null,{status:500})
    }
}