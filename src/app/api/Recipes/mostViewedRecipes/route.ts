import prisma from "@/database/db";
import { NextResponse } from "next/server";

export async function GET() {
    try{
    const views = await prisma.userView.findMany()
    if(!views) return NextResponse.json(null,{status:500})
    const countingViews:{recipeId:number,counter:number}[] = []

    views.forEach(view => {
        if(countingViews.filter(item => item.recipeId === view.recipeId)[0]){
            countingViews.filter(item => item.recipeId === view.recipeId)[0].counter += 1
            return
        }
        countingViews.push({recipeId:view.recipeId,counter:1})
        return
    })    
    const mostViewedViews = countingViews.sort((a,b)=> a.counter - b.counter).slice(0,3)
    if(!mostViewedViews) return NextResponse.json(null,{status:500})
    const recipes = []
    
    for(let i=0;i<mostViewedViews.length;i++){
        recipes.push(await prisma.recipe.findUnique({
            where:{
                id:mostViewedViews[i].recipeId
            }
        }))
    }

    return NextResponse.json(recipes,{status:200})
    }catch(err){
        console.log(err)
        return NextResponse.json(null,{status:500})
    }
}