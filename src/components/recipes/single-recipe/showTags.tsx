import { tags } from "@prisma/client"
import Link from "next/link"
import { Button } from "react-bootstrap"

export default async function ShowTags({recipeId}:{recipeId:number}){
    const url = process.env.NEXTAUTH_URL
    const tagsResponse = await fetch(url+"/api/Tag/showRecipeTags",{
        method:"POST",
        headers:{
            "Content-Type":"Application/json"
        },
        body:JSON.stringify({recipeId:recipeId})
    })
    if(!tagsResponse.ok){
        return(
            <>
                <div className="alert alert-danger">
                    An error ocurred when loading the tags
                </div>
            </>
        )
    }
    const recipeTags:tags[] = await tagsResponse.json()
    return(
        <>
            { recipeTags.length > 0 && recipeTags.map(tag =>(
                <Link href={`/recipes/tag/${tag.name}`} key={tag.id} className="me-5"><Button>{tag.name}</Button></Link>
            ))}
        </>
    )
}