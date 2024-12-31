"use client"
import { useParams } from "next/navigation"
import { useState } from "react"
import { recipe, user } from "@prisma/client"
import { useSession } from "next-auth/react"
import Image from "next/image"
import 'bootstrap-icons/font/bootstrap-icons.css';
import LikeBtn from "./local components/like-btn"
import FavoriteBtn from "./local components/favorite-btn"
import OtherRecipes from "./local components/other-recipes"
import RecipeViews from "./local components/recipe-views"
import Link from "next/link"
import ShowTags from "./local components/showTags"
import styles from "../../../../styles/recipes/recipe-page.module.css"
export default function SingleRecipe(){
    const params = useParams()
    const recipeId = params.recipeid
    const [recipe,setRecipe] = useState<recipe|null>(null)
    const [creator,setCreator] = useState<user|null>(null)
    const { data: session, status } = useSession()

    if(recipe === null){
        fetch(`/api/recipe/${recipeId}`,{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
              }
        }).then(result => result.json())
        .then(result => {
            setRecipe(result.recipe)
            setCreator(result.user)
        })
        .catch((err)=> console.log(err))
    }

    if(status === "authenticated" && recipe){
        fetch("/api/addRecipeView",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({recipeName:recipe.name})
        })
    } 

    return (
        <div className="bg-light p-5">
        <main className={"d-flex p-5 gap-5 bg-white "+styles.Mainrecipe}>
            <div className={"grow-1 d-flex "}>
                { recipe && <Image src={String(recipe.imgUrl)} width={500} height={500} 
                className="w-100 img-fluid rounded align-self-center" alt="recipe image"/>
                }
            </div>
            <div className={"grow-1 "}>
                <h1>{recipe?.name}</h1>
                <RecipeViews recipeId={Number(recipe?.id)}/>
                <p>{recipe?.description}</p>
                <p>Publish date: {String(recipe?.createdAt).split('T')[0]}</p>
                <div className="d-flex mt-5 w-100 gap-5">
                    {
                        recipe && <LikeBtn recipeId={Number(recipe.id)}/>                   
                    }
                    {
                        recipe && <FavoriteBtn recipeId={Number(recipe.id)}/>
                    }
                    
                </div>
                <div className="mt-3">
                  {recipe && <ShowTags recipeId={recipe.id}/>  }
                </div>
                <div className="mt-5">
                    <p>Created by:</p>
                    <div className="d-flex justify-content-between">
                        <Link href={`/user/${creator?.id}`}><p className="h4">{creator?.name}</p></Link>
                        {creator && <Image src={String(creator?.img)} alt="user's profile image" className="rounded" height={50} width={50}/>}
                    </div>
                </div>
            </div>
        </main>

        <section className="mt-5">
            <div className="ps-5">
                <p className="h1 text-start ps-5">Related Recipes</p>
            </div>
            <section className="d-flex gap-5 px-5 py-3 flex-wrap justify-content-center">
                <OtherRecipes recipeId={Number(recipe?.id)}/>
            </section>
        </section>
        
        </div>
    )
}