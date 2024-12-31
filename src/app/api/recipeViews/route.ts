import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/db";

export async function POST(req:NextRequest) {
    try{
    const {recipeId} = await req.json()
    if(!recipeId) throw new Error('Recipe not found')
    const views = await prisma.userView.findMany({
        where:{
            recipeId:recipeId
        }
    })
    return NextResponse.json(Number(views.length))
    }catch(err){
        console.log(err)
        return NextResponse.json({error:err})
    }
}