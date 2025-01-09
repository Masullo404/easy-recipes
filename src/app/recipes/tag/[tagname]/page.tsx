"use client"
import { recipe } from "@prisma/client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "react-bootstrap"
import Link from "next/link"

export default function RecipesWithTag(){
    const params = useParams()
    const tagName = params.tagname
    const [recipesByTag,setRecipes] = useState<recipe[]|null>(null)
    useEffect(()=>{
        fetch(`/api/Tag/showRecipesByTag`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({tagName:tagName})
        }).then(result => result.json())
        .then(result =>setRecipes(result))
        .catch((err)=> console.log(err))
    },[])
    return(
        <main className="d-flex flex-wrap justify-content-center bg-light py-5" style={{minHeight:"80px"}}>
            {(recipesByTag)?
            (
               <>
               <div className="w-100 text-center py-5">
                <p className="display-1">See Recipes with &apos;{tagName}&apos; tag</p>
               </div>
               {recipesByTag.length > 0 && recipesByTag.map(recipe =>(
                <div className="w-25 rounded bg-white m-5" style={{minWidth:"300px"}} key={recipe.id}>
                    <Image src={recipe.imgUrl} alt="recipe image"  width={500} height={500} className="w-100 img-fluid rounded-top"/>
                    <div className="py-5 ps-3">
                        <p className="h3">{recipe.name}</p>
                        <Link href={`/recipes/recipe/${recipe.id}`}><Button>See Recipe</Button></Link>
                    </div>
                </div>
                ))}
               
               </>
            )
            :
            (
                <h1>No Recipes With the &quot;{tagName}&quot; tag</h1>
            )
            }
        </main>
    )
    
}