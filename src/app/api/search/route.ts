import prisma from "@/database/db";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try{  
        const {param} = await req.json()
        const allRecipes = await prisma.recipe.findMany()
        const filteredRecipes = allRecipes.map((recipe) =>{
            return{
             id:recipe.id,
             name:recipe.name.toLowerCase(),
             description:recipe.description,
             imgUrl:recipe.imgUrl,
             userId:recipe.userId,
             createdAt:recipe.createdAt
             }
         })
         const result = filteredRecipes.filter(recipe => recipe.name.includes(String(param).toLowerCase()))
        return NextResponse.json(result,{status:200})
    } catch(error){
        console.log("Server error: "+error)
    }
}