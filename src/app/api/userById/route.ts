import prisma from "@/database/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try{
        const { userId } = await req.json();
        if(!userId || isNaN(userId)) throw new Error('user not identified')

        const user = await prisma.user.findUnique({
            where:{
                id:userId
            }
        })
        const recipes = await prisma.recipe.findMany({
            where:{
                userId:userId
            },
            include:{
                _count:{
                    select:{
                        like:{
                            where:{
                                liked:true
                            }
                        }
                    }
                }
            }
        })
        const mostLikedRecipe = recipes.sort((a,b)=> a._count.like - b._count.like).slice(0,1)
        return NextResponse.json({ user:user, recipe: mostLikedRecipe[0] });
        
    }catch(err){
        console.log(err)
        NextResponse.json(err)
    }
}
