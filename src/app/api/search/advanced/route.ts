import prisma from "@/database/db";
import { NextRequest,NextResponse } from "next/server";
import { recipe } from "@prisma/client";
export async function POST(req:NextRequest) {   
    try{
        const filter = await req.json()
        const {recents} = filter
        const {mostV} = filter
        if(mostV && recents){
            const response = await fetch(process.env.NEXTAUTH_URL+'/api/mostViewedRecipes')
            const mostViews:recipe[] = await response.json()
            const result = mostViews.sort((a,b) => Number(a.createdAt)-Number(b.createdAt))
            return NextResponse.json(result)
        }
        if(recents) {
            const recipes = await prisma.recipe.findMany({
                orderBy:{
                    createdAt:"desc"
                }
            })
            return NextResponse.json(recipes)
        }
        if(mostV){
            const response = await fetch(process.env.NEXTAUTH_URL+'/api/mostViewedRecipes')
            const result:recipe[] = await response.json()
            return NextResponse.json(result)
        }
        const allRecipes = await prisma.recipe.findMany()
        return NextResponse.json(allRecipes)
    }catch(err){
        console.log("Caugth Error: "+err)
    }
}   