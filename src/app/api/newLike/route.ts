import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import prisma from "@/database/db";

export async function POST(req:NextRequest) {
    try{
        const session = await getServerSession(options)
        const {recipeId} = await req.json()
        const user = await prisma.user.findUnique({
            where:{
                email:String(session?.user?.email)
            }
        })
        
        const like = await prisma.like.findUnique({
            where:{
                recipeId_userId:{
                    userId:Number(user?.id),
                    recipeId:Number(recipeId)    
                }
            }
        })
        if(like){
            const data:boolean = (like.liked)?false:true
            await prisma.like.update({
                where:{
                    recipeId_userId:{
                        userId:Number(user?.id),
                        recipeId:Number(recipeId)    
                    }
                },
                data:{
                    liked:data
                }
            })
            return NextResponse.json(data)
        }
        await prisma.like.create({
            data:{
                recipeId:Number(recipeId),
                userId:Number(user?.id)
            }
        })
        return NextResponse.json(true)
    }catch(err){
        console.log(err)
        return
    }
}
export async function PUT(req:NextRequest) {
    try{
        const session = await getServerSession(options)
        const {recipeId} = await req.json()
        const user = await prisma.user.findUnique({
            where:{
                email:String(session?.user?.email)
            }
        })
        const like = await prisma.like.findUnique({
            where:{
                recipeId_userId:{
                    userId:Number(user?.id),
                    recipeId:Number(recipeId)
                }
            }
        }) 
        if(!like){
            return NextResponse.json(false)
        }
        return NextResponse.json(Boolean(like.liked))
        
    }catch(err){
        console.log("Caught Error: "+err)
        return 
    }
}
