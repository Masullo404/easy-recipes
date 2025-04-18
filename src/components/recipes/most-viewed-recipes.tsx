"use server"
import { recipe } from "@prisma/client"
import Link from "next/link"
import { Button, Spinner } from "react-bootstrap"
import styles from "../../styles/recipes/recipes-page.module.css";

export default async function MostViewedRecipes(){
    const url = process.env.NEXTAUTH_URL
    if(!url){
        return(
            <div style={{height:"80vh"}} className="d-flex align-items-center justify-content-center">
                <div className="alert alert-danger">
                    An error ocurred when loading the most viewed recipes
                </div>
            </div>
        )
    }
    const recipesResponse = await fetch(url+"/api/Recipes/search/advanced",{
        method:"POST",
        headers:{
            'Content-Type':"Application/json"
        },
        body:JSON.stringify({mostV:true,recents:false,tags:[]})
    })
    if(!recipesResponse.ok) {
        return(
            <div className="alert alert-danger">
                Something went wrong when redering the most viewed recipes.
            </div>
        )
    }
    const recipes:recipe[]  = await recipesResponse.json()
    return(
        <>
        { (recipes)?
        (
            recipes.map((recipe)=>(
                <div key={recipe.id} className={"d-flex justify-content-between rounded bg-white shadow-sm "+styles.mostViewed}>
                    <img src={recipe.imgUrl} width={500} height={500} alt="food image" className={"img-fluid w-50 rounded object-fit-cover "+styles.mostViewedImg }/>
                    <div className="d-flex flex-column gap-3 p-3 w-50 justify-content-around">
                        <p className="text-center h4">{recipe.name}</p>
                        <p>{recipe.description.slice(0,50)}...</p>
                        <Link href={`/recipes/recipe/${recipe.id}`} className="align-self-center">
                            <Button>See The recipe</Button>
                        </Link>
                    </div>
                </div>
            ))
        )
        :
        (
            <div className="w-100 text-center">
                <Spinner />
            </div>  
        )
        }
        </>
    )
}