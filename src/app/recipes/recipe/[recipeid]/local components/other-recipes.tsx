"use client"
import { useEffect, useState } from "react"
import { recipe } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "react-bootstrap"
import styles from "../../../../../styles/recipes/recipe-page.module.css"

export default function OtherRecipes({recipeId}:{recipeId:number}){
    const [otherRecipes,setOther] = useState<recipe[]|null>(null)
    useEffect(()=>{
        fetch("/api/Recipes/search/advanced",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({recents:false,mostV:false})
        }).then(result => result.json())
        .then(result => setOther(result))
        .catch(err => console.log(err)) 
    },[])
    return(
        <>
           { (otherRecipes)?
           (
            otherRecipes.filter(recipes => recipes.id !== recipeId).slice(0,4).map(recipe => (
                <div key={recipe.id} className={"bg-white shadow-sm rounded   "+styles.OtherRecipes}>
                    <Image src={recipe.imgUrl} alt="recipe image" width={500} height={500} className="img-fluid w-100 h-50"/>
                    <div className="d-flex flex-column justify-content-between p-3 h-50">
                        <p className="h2">{recipe.name}</p>
                        <Link href={`/recipes/recipe/${recipe.id}`}><Button>See Recipe</Button></Link>
                    </div>
                </div>
            ))
           )
           :
           (null)
            }
        </>
    )
}