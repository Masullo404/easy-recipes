import { NextRequest,NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req:NextRequest) {
    try{
        if(req.nextUrl.pathname === "/profile" ||req.nextUrl.pathname === "/my_recipes"){
        setTimeout(async ()=>{
          const url = process.env.NEXTAUTH_URL
          const sessionResponse = await fetch(url+"/api/session")
          const session = await sessionResponse.json()
          if(session){
            return NextResponse.next()
          }
          return NextResponse.redirect(new URL('/forms/login',req.url))
        },500)
      }
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
      "/my_recipes",
      "/profile",
      "/api/addRecipeView",
      "/api/favorite",
      "/api/getUserBySession",
      "/api/newLike",
      "/api/newRecipe",
      "/api/updateUser"
    ]
}
