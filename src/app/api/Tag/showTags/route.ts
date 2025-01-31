import prisma from "@/database/db";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const allTags = await prisma.tags.findMany()
        if(!allTags) return NextResponse.json(null,{status:500})
        return NextResponse.json(allTags)
    }catch(err){
        console.log(err)
        return NextResponse.json({error:err})
    }
}