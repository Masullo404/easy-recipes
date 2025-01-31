import Link from "next/link"
import { Button } from "react-bootstrap"
import Image from "next/image"
import styles from "../../styles/my-recipes/style.module.css"
import { recipe } from "@prisma/client"
import { getServerSession } from "next-auth"
import { options } from "@/app/api/auth/[...nextauth]/options"

export default async function MyRecentRecipes() {
    const session = await getServerSession(options)
    const url = process.env.NEXTAUTH_URL
    const recipesResponse = await fetch(url+"/api/Recipes/recentRecipes",{
      method:"POST",
      headers:{
        "Content-Type":"Application/json"
      },
      body:JSON.stringify({session:session})
    })
    if(!recipesResponse.ok){
      return(
        <div className="alert alert-danger">
          An error ocurred when loading your recent recipes
        </div>
      )
    }
    const recipes:recipe[] = await recipesResponse.json()
  
    return (
      <>
        { recipes && recipes?.length > 0 && recipes ? 
        (
        recipes.slice(0,3).map( recipe => (
        <div className={"d-flex bg-light rounded shadow-sm my-5 "+styles.recentRecipes} key={recipe.name}>
            <Image src={recipe.imgUrl} alt="recipe image" width={200} height={300} className="object-fit-cover rounded w-50"/>
            <div className="d-flex justify-content-between align-items-center px-5">
              <p className="h3">{recipe.name}</p>
              <Link href={`/recipes/recipe/${recipe.id}`}><Button>See more</Button></Link>
            </div>
        </div> 
        )))
        :
        (
          <h1>You don&apos;t have files yet.</h1>
        )}
      </>
    );
  }