import { NextRequest,NextResponse } from "next/server";
import PopularRecipes from "./mostViewed";
import { recipe } from "@prisma/client";
import prisma from "@/database/db";
export async function POST(req:NextRequest) {   
    try{
        const {recents,mostV,tags}:{recents:boolean,mostV:boolean,tags:string[]} = await req.json()
        
        let result:recipe[] = await prisma.recipe.findMany()
        if(recents){
            result  = await prisma.recipe.findMany({
                orderBy:{
                    createdAt:"desc"
                }
            })
        }
        if(mostV){
            const popularRecipes = await PopularRecipes(result)
            if(popularRecipes) result = popularRecipes
        }
        if(Boolean(tags.length)){
            console.log(tags)
            const recipes:recipe[] = []
            for(let i=0;i<tags.length;i++){
                const tagsRelations = await prisma.tags.findMany({where:{name:tags[i]}})
                for (let u=0;u<tagsRelations.length;u++) {
                    const relation = tagsRelations[u]       
                    for (let y=0;y<result.length;y++) {
                        const recipe = result[y]
                        if(relation.id === recipe.id) recipes.push(recipe)
                    }
                }   
            }
            result = recipes
        }
        return NextResponse.json(result,{status:200})
    }catch(err){
        console.log(err)
        return NextResponse.json(null,{status:500})
    }
}