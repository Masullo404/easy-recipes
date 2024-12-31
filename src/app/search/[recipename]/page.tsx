"use client"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useEffect } from "react"
import { recipe } from "@prisma/client"
import Link from "next/link"
import { Button } from "react-bootstrap"
import styles from "../../../styles/search/style.module.css"
export default function Search(){
    const search = useParams()
    const words = search.recipename
    const [recipes,setRecipes] = useState<recipe[]|null>(null)

    useEffect(()=>{
        fetch("/api/search",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json', // Especifica que o corpo é JSON
            },
            body:JSON.stringify({param:words})
        }).then((result) => result.json())
        .then((result) => setRecipes(result))
        .catch((error)=> console.log("Error: "+error))
    },[])
    return(
        <main className="bg-light">
            <main className="d-flex flex-column align-items-center p-5">
                {recipes && (recipes.length >= 1)? 
                    (
                        <>
                            <h1>See recipes that contain:"{words}"</h1>
                            <div className="d-flex flex-wrap p-5 gap-5 justify-content-center" style={{minHeight:"80vh"}}>
                                {
                                    recipes.map(recipe =>(
                                        <div key={recipe.name} style={{width:"30%"}} className={"bg-white rounded shadow-sm "+styles.recipes}>
                                            <img src={recipe.imgUrl} alt="recipe image" className="rounded w-100" />
                                            <div className="d-flex flex-column ps-4 pt-5 pb-3">
                                                <p className="h3">{recipe.name}</p>
                                                <p>{recipe.description.slice(0,40)+"..."}</p>
                                                <Link href={`/recipes/recipe/${recipe.id}`}><Button>See more</Button></Link>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    )
                    :
                    (
                    <>
                        <div className="d-flex flex-column justify-content-center align-items-center" style={{height:'75vh'}}>
                            <h1 className="h-">No recipes found with:"{words}"</h1>
                            <p className="display-1">Please try a valid search</p>
                        </div>
                    </>
                    )
                }
            </main>
        </main>
    )
}