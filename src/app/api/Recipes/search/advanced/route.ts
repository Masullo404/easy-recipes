import prisma from "@/database/db";
import { NextRequest,NextResponse } from "next/server";
import { recipe } from "@prisma/client";
export async function POST(req:NextRequest) {   
    try{
        const filter = await req.json()
        const {recents}:{recents:boolean} = filter
        const {mostV}:{mostV:boolean} = filter
        if(mostV && recents){
            const response = await fetch(process.env.NEXTAUTH_URL+'/api/Recipes/mostViewedRecipes')
            const mostViews:recipe[] = await response.json()
            const result = mostViews.sort((a,b) => Number(a.createdAt)-Number(b.createdAt))
            return NextResponse.json(result,{status:200})
        }
        if(recents) {
            const recipes = await prisma.recipe.findMany({
                orderBy:{
                    createdAt:"desc"
                }
            })
            return NextResponse.json(recipes,{status:200})
        }
        if(mostV){
            const response = await fetch(process.env.NEXTAUTH_URL+'/api/Recipes/mostViewedRecipes')
            const result:recipe[] = await response.json()
            return NextResponse.json(result,{status:200})
        }
        const allRecipes = await prisma.recipe.findMany()
        if(!allRecipes) return NextResponse.json(null,{status:500})
        return NextResponse.json(allRecipes,{status:200})
    }catch(err){
        console.log("Caugth Error: "+err)
        return NextResponse.json({error:err})
    }
}   