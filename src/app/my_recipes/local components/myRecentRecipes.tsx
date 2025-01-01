"use client"
import Link from "next/link"
import { useState } from "react"
import React from "react"
import { Button } from "react-bootstrap"
import styles from "../../../styles/my-recipes/style.module.css"


type recipe ={
    id:number,
    name:string,
    description:string,
    createdAt:string,
    userId:number,
    imgUrl:string
}

export  function MyRecentRecipes() {
    const [recipes, setRecipes] = useState<recipe[] | null>(null);

    if(!recipes){
      fetch("/api/recentRecipes", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((result) => result.json())
      .then((result) => setRecipes(result.slice(0,3)))
      .catch((error) => console.log("Error: " + error));
    }
  
    return (
      <>
        {recipes ? (
            recipes.map((recipe) => (
              <div className={"d-flex bg-light rounded shadow-sm my-5 "+styles.recentRecipes} key={recipe.name}>
                  <img
                    src={`${recipe.imgUrl}`}
                    alt="recipe image" 
                    className="object-fit-cover rounded"
                  />
                  <div className="d-flex justify-content-between align-items-center px-5">
                    <p className="h3">{recipe.name}</p>
                    <Link href={`/recipes/recipe/${recipe.id}`}><Button>See more</Button></Link>
                  </div>
              </div> 
              ))
        ) 
        : 
        (
          <h1>You don&apos;t have files yet.</h1>
        )}
      </>
    );
  }