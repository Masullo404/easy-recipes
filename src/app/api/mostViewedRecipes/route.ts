import prisma from "@/database/db";
import { NextRequest,NextResponse } from "next/server";

export async function GET() {
    try{
    const views = await prisma.userView.findMany()
    const countingViews:{recipeId:number,counter:number}[] = []

    views.forEach(view => {
        if(countingViews.filter(item => item.recipeId === view.recipeId)[0]){
            countingViews.filter(item => item.recipeId === view.recipeId)[0].counter += 1
        }
        countingViews.push({recipeId:view.recipeId,counter:1})
        return
    })    
    const mostViewedViews = countingViews.sort((a,b)=> a.counter - b.counter).slice(0,3)
    const recipes = []
    
    for(let i=0;i<mostViewedViews.length;i++){
        recipes.push(await prisma.recipe.findUnique({
            where:{
                id:mostViewedViews[i].recipeId
            }
        }))
    }

    return NextResponse.json(recipes)
    }catch(err){
        console.log(err)
    }
}