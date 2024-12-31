import prisma from "@/database/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try{
    const {tagName} = await req.json()
    if(!tagName) throw new Error("Bad Request:Tag name not passed in the request")
    const TagId = await prisma.tags.findUnique({
        where:{
            name:String(tagName)
        },
        select:{
            id:true
    }})
    
    if(!TagId || !TagId.id) throw new Error('Tag not found')
    const recipes = await prisma.recipeTags.findMany({
        where:{
            tagId:TagId.id
        },
        select:{
            recipe:true
        }
    })
    const result = recipes.map(recipe => recipe.recipe)
    return NextResponse.json(result)
    }catch(err){
        console.log(err)
        return NextResponse.json({error:err})
    }
}