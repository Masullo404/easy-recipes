"use client"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useEffect } from "react"
import { recipes } from "@/app/my_recipes/myRecentRecipes"
import Link from "next/link"
export default function Search(){
    const search = useParams()
    const words = search.recipename
    const [recipes,setRecipes] = useState<recipes|null>(null)

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
        <>
            <main className="d-flex flex-column align-items-center p-5">
                {recipes && (recipes.length >= 1)? 
                    (
                        <>
                            <h1>See recipes that contain:"{words}"</h1>
                            <div className="d-flex flex-wrap p-5" style={{height:"80vh"}}>
                                {
                                    recipes.map(recipe =>(
                                        <div key={recipe.name} style={{width:"30%"}}>
                                            <img src={recipe.imgUrl} alt="recipe image" style={{maxWidth:"100%"}} />
                                            <p className="h3">{recipe.name}</p>
                                            <p>{recipe.description}</p>
                                            <Link href={`/recipe/${recipe.id}`}><button>See more</button></Link>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    )
                    :
                    (
                    <>
                        <div style={{height:"80vh"}}>
                            <h1 style={{height:"100vh"}}>No recipes found with:"{words}"</h1>
                            <img src="" alt="" />
                        </div>
                    </>
                    )
                }
            </main>
        </>
    )
}