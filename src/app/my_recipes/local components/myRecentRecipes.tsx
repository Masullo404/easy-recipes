"use client"
import Link from "next/link"
import { useState,useEffect } from "react"
import React from "react"
import { Button } from "react-bootstrap"
import Image from "next/image"
import styles from "../../../styles/my-recipes/style.module.css"
import { recipe } from "@prisma/client"

export  function MyRecentRecipes() {
    const [recipes, setRecipes] = useState<recipe[] | null>(null);
    useEffect(()=>{
      fetch("/api/Recipes/recentRecipes", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((result) => result.json())
      .then((result) => setRecipes(result.slice(0,3)))
      .catch((error) => console.log("Error: " + error));

    },[])
  
    return (
      <>
        { recipes && recipes?.length > 0 && recipes ? (
            recipes.map((recipe) => (
              <div className={"d-flex bg-light rounded shadow-sm my-5 "+styles.recentRecipes} key={recipe.name}>
                  <Image src={recipe.imgUrl} alt="recipe image" width={200} height={300} className="object-fit-cover rounded w-50 h-100"/>
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