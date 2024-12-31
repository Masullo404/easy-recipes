import prisma from "@/database/db";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const allTags = await prisma.tags.findMany()
        if(!allTags) throw new Error('Error to load tags')
        return NextResponse.json(allTags)
    }catch(err){
        console.log(err)
        return NextResponse.json(null)
    }
}