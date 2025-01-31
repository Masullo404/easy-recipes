import Link from "next/link";
import { recipe } from "@prisma/client";
import { Button } from "react-bootstrap";
import Image from "next/image";
import styles from "../../styles/my-recipes/style.module.css"
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function AllRecipes(){
  const session = await getServerSession(options)
  const url = process.env.NEXTAUTH_URL
  const recipesResponse = await fetch(url+"/api/Recipes/allRecipes",{
    method:"POST",
    headers:{
      "Content-Type":"Application/json"
    },
    body:JSON.stringify({session:session})
  })
  if(!recipesResponse.ok){
    return(
    <div className="alert alert-danger">
        An error ocurred when loading your recipes
    </div>
    )
  }
  const allRecipes:recipe[] = await recipesResponse.json()

  return(
      <>
      {  allRecipes && allRecipes.length > 3 ?
          ( 
          <>
            <h1 className="text-center mt-4">See all your recipes</h1>
            <section className="d-flex justify-content-center flex-wrap gap-5 p-5">
              { allRecipes.map(recipe =>(
                  <div className={"d-flex flex-column bg-white grow-1 h-50 rounded shadow-sm "+styles.allRecipes} key={recipe.name}>
                      <Image src={recipe.imgUrl} alt="recipe image" height={500} width={500} 
                      className={"rounded w-100 object-fit-cover "+styles.recipesImages}/>
                      <div className="p-5 w-100 rounded">
                        <h4 className="text-center">{recipe.name}</h4>
                        <p>{recipe.description.slice(0,100) + "..."}</p>
                        <Link href={`/recipes/recipe/${recipe.id}`} className="d-flex justify-content-center" >
                          <Button className="w-50">See more</Button>
                        </Link>
                      </div>
                </div>
              ))
              }
            </section>
          </>
          )
          :
          (
              <h1 className="text-center p-5">More recipes will appear here!</h1>
          )
      }
      </>
  )
}