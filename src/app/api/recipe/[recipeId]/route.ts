import prisma from "@/database/db";
import { NextRequest,NextResponse } from "next/server";

export  async function GET(req:NextRequest,{ params }: { params: Promise<{ recipeId: string }> }) {
    const  recipeId  = (await params).recipeId
    const recipe = await prisma.recipe.findUnique({
        where:{
            id:Number(recipeId)
        }
    })
    
    return  NextResponse.json(recipe)
}