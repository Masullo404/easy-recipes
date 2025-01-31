import prisma from "@/database/db";
import { NextRequest,NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
export async function POST(req:NextRequest){
    try{
    const {recipeId}:{recipeId:number} = await req.json()
    const session = await getServerSession(options)
    if(!recipeId) return NextResponse.json(null,{status:400})
    const user = await prisma.user.findUnique({
        where:{
            email:String(session?.user?.email)
        }
    })
    if(!user) return NextResponse.json(null,{status:400})
    const recipe = await prisma.recipe.findUnique({
        where:{
            id:recipeId
        }
    })
    if(!recipe) return NextResponse.json(null,{status:500})
    const viewAlreadyExists = await prisma.userView.findUnique({
        where:{
            recipeId_userId:{
                recipeId:Number(recipe.id),
                userId:Number(user.id)
            }
        }
    })
    if(!viewAlreadyExists){
        const newView = await prisma.userView.create({
            data:{
                recipeId:Number(recipe.id),
                userId:Number(user.id)
            }
        })
        return NextResponse.json(newView)
    }
    return NextResponse.json(null,{status:200})
    }catch(err){
        console.log(err)
        return NextResponse.json({status:400})
    }

}