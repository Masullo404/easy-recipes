"use client"
import { tags } from "@prisma/client"
import Link from "next/link"
import { useState,useEffect } from "react"
import { Button } from "react-bootstrap"
export default function ShowTags(props:{recipeId:number}){
    const [recipeTags,setTags] = useState<tags[]|null>(null)
    useEffect(()=>{
        fetch(`/api/Tag/showRecipeTags`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({recipeId:props.recipeId})
        }).then(result => result.json())
        .then(result =>setTags(result))
        .catch((err)=> console.log(err))
    },[])
    return(
        <>
            { recipeTags && recipeTags.length > 0 && recipeTags.map(tag =>(
                <Link href={`/recipes/tag/${tag.name}`} key={tag.id} className="me-5"><Button>{tag.name}</Button></Link>
            ))}
        </>
    )
}