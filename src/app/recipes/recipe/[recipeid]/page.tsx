"use client"
import { useParams } from "next/navigation"
import { useState } from "react"
import { recipe } from "@prisma/client"
export default function SingleRecipe(){
    const params = useParams()
    const recipeId = params.recipeid
    const [recipe,setRecipe] = useState<recipe|null>(null)
    
    if(recipe === null){
        fetch(`/api/recipe/${recipeId}`,{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
              }
        }).then(result => result.json())
        .then(result => setRecipe(result))
        .catch((err)=> console.log(err))
    }
    if(recipe !== null){
        fetch("/api/addRecipeView",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({recipeName:recipe?.name})
        })
    }


    return (
        <main className="d-flex p-5 gap-5 m-5">
            <div className="grow-1 w-50">
                <img src={recipe?.imgUrl} className="w-100 img-fluid" alt="recipe img" />
            </div>
            <div className="grow-1">
                <h1>{recipe?.name}</h1>
                <p>{recipe?.description}</p>
                <p>Publish date: {String(recipe?.createdAt).split('T')[0]}</p>
            </div>
        </main>
    )
}