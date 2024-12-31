import prisma from "@/database/db";
import { NextRequest, NextResponse } from "next/server";

export  async function POST(req:NextRequest) {
    try{
    const {recipeId} = await req.json()
    
    const tags = await prisma.recipeTags.findMany({
        where:{
            RecipeId:recipeId
        },
        select:{
            tag:true
        }
    })
    const result = tags.map(tag => tag.tag)
    return NextResponse.json(result)
    }catch(err){
        console.log(err)
        return NextResponse.json({error:err})
    }
}