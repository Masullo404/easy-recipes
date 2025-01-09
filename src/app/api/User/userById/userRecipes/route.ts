import prisma from "@/database/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try{
    const {userId} = await req.json()
    if(!userId || typeof userId  !== "number") throw new Error('User not found')
    const recipes = await prisma.recipe.findMany({
        where:{
            userId:userId
        }
    })
    return NextResponse.json(recipes)
    }catch(err){
        console.log(err)
    }
}