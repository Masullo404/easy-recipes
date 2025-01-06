import prisma from "@/database/db"
import { NextResponse } from "next/server"


export async function POST(req:Request) {
    try{
        const userData = await req.json() 
        if (!userData) throw new Error('user is not valid')
        const emailAlreadyExists = await prisma.user.findUnique({
            where:{
                email:String(userData.email)
            }
        })
        if(emailAlreadyExists) {
            return NextResponse.json({message:'email already exists',status:406})
        }
        await prisma.user.create({
            data:{
                name:String(userData.name),
                email:String(userData.email),
                password:String(userData.password)
            }
        })
        return NextResponse.redirect(process.env.NEXTAUTH_URL+'/forms/login')
    }catch(err){
        console.log("See the error: "+err)
        return NextResponse.json({message:'Something went wrong',status:500})
    }
}