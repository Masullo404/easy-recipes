import prisma from "@/database/db";
import { NextRequest,NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
export async function POST(req:NextRequest){
    try{
    const {recipeName} = await req.json()
    const session = await getServerSession(options)
    if(!recipeName) throw new Error('Invalid recipe')
    const user = await prisma.user.findUnique({
        where:{
            email:String(session?.user?.email)
        }
    })
    if(!user) throw new Error("User not allowed")
    const recipe = await prisma.recipe.findUnique({
        where:{
            name:String(recipeName)
        }
    })
    if(!recipe) throw new Error('Recipe not found')
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
    return NextResponse.json({status:200})
    }catch(err){
        console.log(err)
        return NextResponse.json({status:400})
    }

}