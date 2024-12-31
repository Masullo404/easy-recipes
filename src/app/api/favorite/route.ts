import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import prisma from "@/database/db";

export async function POST(req:NextRequest) {
    try{
    const {recipeId} = await req.json()
    const session = await getServerSession(options)
    const user = await prisma.user.findUnique({
        where:{
            email:String(session?.user?.email)
        }
    })
    const favorite = await prisma.favorites.findUnique({
        where:{
            recipeId_userId:{
                userId:Number(user?.id),
                recipeId:Number(recipeId)    
            }
        }
    })
    if(favorite){
        const data:boolean = (favorite.bookmarked)?false:true
            await prisma.favorites.update({
                where:{
                    recipeId_userId:{
                        userId:Number(user?.id),
                        recipeId:Number(recipeId)    
                    }
                },
                data:{
                    bookmarked:data
                }
            })
        return NextResponse.json(data)
    }
    await prisma.favorites.create({
        data:{
            recipeId:Number(recipeId),
            userId:Number(user?.id)
        }
    })
    return NextResponse.json(true)
    }catch(err){
        console.log(err)
    }
}
export async function PUT(req:NextRequest) {
    try{
    const {recipeId} = await req.json()
    const session = await getServerSession(options)
    const user = await prisma.user.findUnique({
        where:{
            email:String(session?.user?.email)
        }
    })
    const favorite = await prisma.favorites.findUnique({
        where:{
            recipeId_userId:{
                userId:Number(user?.id),
                recipeId:Number(recipeId)    
            }
        }
    })
    if(!favorite) {
        return NextResponse.json(false)
    }
    return NextResponse.json(Boolean(favorite.bookmarked))
    }catch(err){
        console.log(err)
    }
}