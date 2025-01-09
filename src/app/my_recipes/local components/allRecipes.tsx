"use client"
import Link from "next/link";
import { recipe } from "@prisma/client";
import { useState,useEffect } from "react";
import { Button } from "react-bootstrap";
import Image from "next/image";
import styles from "../../../styles/my-recipes/style.module.css"
export default  function AllRecipes(){
  const [allRecipes,setAllRecipes] = useState<recipe[]|null>(null)
    useEffect(()=>{
      fetch("/api/Recipes/allRecipes", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then((result) => result.json())
        .then((result) => setAllRecipes(result))
        .catch((error) => console.log("Error: " + error));
    },[])

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
                          <p>{recipe.description.slice(0,40) + "..."}</p>
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