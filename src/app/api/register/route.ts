import prisma from "@/database/db"
import { NextResponse } from "next/server"


export async function POST(req:Request) {
    try{
        const userData= await req.formData() 
        console.log(userData)
        
        if (!userData) throw new Error('user is not valid')
        await prisma.user.create({
            data:{
                name:String(userData.get('name')),
                email:String(userData.get('email')),
                password:String(userData.get('password'))
            }
        })
        return NextResponse.redirect(process.env.NEXTAUTH_URL+"/forms/login")
    }catch(err){
        console.log("See the error: "+err)
    }
}