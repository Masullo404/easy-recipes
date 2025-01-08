import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const session = await getServerSession(options)
        if(!session){
            return NextResponse.json(false,{status:401})
        }
        return NextResponse.json(true,{status:200})
    } catch(err){
        console.log(err)
        return NextResponse.json(false,{status:500})
    }
}