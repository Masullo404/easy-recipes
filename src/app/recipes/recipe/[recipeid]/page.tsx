import 'bootstrap-icons/font/bootstrap-icons.css';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import Link from "next/link"
import FavoriteBtn from '@/components/recipes/single-recipe/favorite-btn';
import LikeBtn from '@/components/recipes/single-recipe/like-btn';
import RecipeViews from '@/components/recipes/single-recipe/recipe-views';
import ShowTags from '@/components/recipes/single-recipe/showTags';
import OtherRecipes from '@/components/recipes/single-recipe/other-recipes';
import Image from "next/image"
import styles from "../../../../styles/recipes/recipe-page.module.css"
import { recipe, user } from "@prisma/client"

export default async  function SingleRecipe({params}:{params:{recipeid:string}}){
    const session = await getServerSession(options)
    if(session){
        fetch("/api/Views/addRecipeView",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({recipeId:Number(params.recipeid)})
        })
    }
    const url = process.env.NEXTAUTH_URL
    const Response = await fetch(url+`/api/Recipes/recipe/${params.recipeid}`,{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            }
    })
    if(!Response.ok){
        return(
            <div className="d-flex justify-content-center align-items-center" style={{height:"80vh"}}>
                <div className="alert alert-danger">
                    An error ocurred when loading the recipe data.
                </div>
            </div>
        )
    }
    const {recipe,user}:{recipe:recipe,user:user} = await Response.json()
    
    return(
        <div className="bg-light p-5">
        <main className={"d-flex p-5 gap-5 bg-white "+styles.Mainrecipe}>
            <div className={"grow-1 d-flex "}>
                { recipe && <Image src={String(recipe.imgUrl)} width={500} height={500} 
                className="w-100 img-fluid rounded align-self-center" alt="recipe image"/>
                }
            </div>
            <div className={"grow-1 "}>
                <h1>{recipe?.name}</h1>
                    
                    <RecipeViews recipeId={Number(params.recipeid)}/>

                <p>{recipe?.description}</p>
                <p>Publish date: {String(recipe?.createdAt).split('T')[0].split('-').sort().reduce((a,b)=>a+'/'+b)}</p>
                <div className="d-flex mt-5 w-100 gap-5">
                { (session)?
                (
                <>
                    <LikeBtn recipeId={Number(params.recipeid)} />
                    <FavoriteBtn recipeId={Number(params.recipeid)} />
                </>
                )
                :
                (
                    null
                )
                }
                </div>
                <div className="mt-3">
                <ShowTags recipeId={Number(params.recipeid)} />
                </div>
                <div className="mt-5">
                    <p>Created by:</p>
                    <div className="d-flex justify-content-between">
                        <Link href={`/user/${user?.id}`}><p className="h4">{user?.name}</p></Link>
                        {user && <Image src={String(user?.img)} alt="user's profile image" className="rounded" height={50} width={50}/>}
                    </div>
                </div>
            </div>
        </main>

        <section className="mt-5">
            <div className="ps-5">
                <p className="h1 text-start ps-5">Related Recipes</p>
            </div>
            <section className="d-flex gap-5 px-5 py-3 flex-wrap justify-content-center">
                <OtherRecipes recipeId={Number(params.recipeid)}/>
            </section>
        </section>
    </div>
    )
}