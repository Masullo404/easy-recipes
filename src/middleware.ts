import { NextRequest,NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req:NextRequest) {
    try{
      const token = await getToken({req,secret:process.env.JWT_SECRET})
      if(!token){
        console.log('middleware redirecting')
        return NextResponse.redirect(new URL('/forms/login',req.url))
      } 
      console.log('middlere verification done')
      return NextResponse.next()
    }catch(err){
        console.log(err)
        console.log('middleware redirecting because of an error')
        return NextResponse.redirect(new URL('/forms/login',req.url))
    }
}

export const config = {
    matcher:[
      "/profile",
      "/my_recipes",
      "/api/addRecipeView",
      "/api/favorite",
      "/api/getUserBySession",
      "/api/newLike",
      "/api/newRecipe",
      "/api/updateUser"
    ]
}