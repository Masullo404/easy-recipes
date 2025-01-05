"use client"
import { user } from "@prisma/client"
import { useState } from "react"
import Image from "next/image"
import styles from "../../../styles/my-profile/style.module.css"
export default function ImageProfile(){
    const [user,setUser] = useState<user|null>(null)
    
    if(user === null){
        fetch("/api/getUserBySession").then(result => result.json())
        .then(result => setUser(result))
        .catch(err => console.log(err))
    }
    
    return(
        <>
        {
         user && <Image src={user.img} alt="user image profile" height={500} width={500} className={"img-fluid "+styles.profileImg}/>
        }
        </>
    )
}