import { recipe } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { Button, Spinner } from "react-bootstrap"
import styles from "../../../styles/recipes/recipe-page.module.css"

export default async function OtherRecipes({recipeId}:{recipeId:number}){
    const url = process.env.NEXTAUTH_URL
    const recipesResponse = await fetch(url+"/api/Recipes/search/advanced",{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({recents:false,mostV:false})
    })
    if(!recipesResponse.ok){
        return(
            <>
                <div className="alert alert-danger">
                    Failed to load related recipes.
                </div>
            </>
        )
    }
    const otherRecipes:recipe[] = await recipesResponse.json()

    return(
        <>
           { (otherRecipes)?
           (
            otherRecipes.filter(recipes => recipes.id !== recipeId).slice(0,4).map(recipe => (
                <div key={recipe.id} className={"bg-white shadow-sm rounded   "+styles.OtherRecipes}>
                    <Image src={recipe.imgUrl} alt="recipe image" width={500} height={500} className="img-fluid w-100 h-50 object-fir-cover"/>
                    <div className="d-flex flex-column justify-content-between p-3 h-50">
                        <p className="h2">{recipe.name}</p>
                        <Link href={`/recipes/recipe/${recipe.id}`}><Button>See Recipe</Button></Link>
                    </div>
                </div>
            ))
           )
           :
           (
            <Spinner />
           )
            }
        </>
    )
}