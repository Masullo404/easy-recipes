"use client"
import { user } from "@prisma/client"
import { useState } from "react"
export default function ImageProfile(){
    const [user,setUser] = useState<user|null>(null)
    
    if(user === null){
        fetch("/api/getUserBySession").then(result => result.json())
        .then(result => setUser(result))
        .catch(err => console.log(err))
    }
    
    return(
        <img src={user?.img} alt="user image profile"  className="grow-1 img-fluid" style={{maxHeight:"560px",maxWidth:"560px"}}/>
    )
}