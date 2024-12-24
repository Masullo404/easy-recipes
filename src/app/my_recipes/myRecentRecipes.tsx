"use client"
import Link from "next/link"
import { useState } from "react"
import { useEffect } from "react"
import React from "react"

type recipe ={
    id:number,
    name:string,
    description:string,
    createdAt:string,
    userId:number,
    imgUrl:string
}
export type recipes = recipe[]

export  function MyRecentRecipes() {
    const [recipes, setRecipes] = useState<recipes | null>(null);
  
    useEffect(() => {
      fetch("/api/recentRecipes", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((result) => result.json())
      .then((result) => setRecipes(result))
      .catch((error) => console.log("Error: " + error));
    }, []);
  
    return (
      <>
        {recipes ? (
            recipes.map((recipe) => (
              <div className="d-flex justify-content-between" key={recipe.name}>
                <div className="d-flex justify-content-between">
                  <img
                    src={`${recipe.imgUrl}`}
                    alt="recipe image" 
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                  <h4>{recipe.name}</h4>
                </div>
                <Link href={`/recipes/recipe/${recipe.id}`}><button>See more</button></Link>
                
              </div> ))
          
        ) 
        : 
        (
          <h1>You don't have files yet.</h1>
        )}
      </>
    );
  }