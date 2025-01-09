import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import prisma from "@/database/db";

export async function POST(req:NextRequest) {
    try{
    const session = await getServerSession(options)
    const {recipeId} = await req.json()
    if(!recipeId){
        return NextResponse.json(null,{status:40})
    }
    const user = await prisma.user.findUnique({
        where:{
            email:String(session?.user?.email)
        }
    })
    if(!user){
        return NextResponse.json(null,{status:404})
    }
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
        return NextResponse.json(null,{status:500})
    }
}
export async function PUT(req:NextRequest) {
    try{
    const session = await getServerSession(options)
    const {recipeId} = await req.json()
    if(!recipeId){
        return NextResponse.json(null,{status:400})
    }
    const user = await prisma.user.findUnique({
        where:{
            email:String(session?.user?.email)
        }
    })
    if(!user){
        return NextResponse.json(null,{status:404})
    }
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
        return NextResponse.json(null,{status:500})
    }
}