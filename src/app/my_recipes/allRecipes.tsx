"use client"
import Link from "next/link";
import { recipes } from "./myRecentRecipes"
import { useEffect } from "react";
import { useState } from "react";
export default  function AllRecipes(){
  const [recentRecipes,setRecentRecipes] = useState<recipes|null>(null)
  const [allRecipes,setAllRecipes] = useState<recipes|null>(null)
  useEffect(()=>{
    fetch("/api/recentRecipes", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then((result) => result.json())
        .then((result) => setRecentRecipes(result))
        .catch((error) => console.log("Error: " + error));
    
    fetch("/api/allRecipes", {
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
        { recentRecipes && allRecipes && allRecipes.length > 3 ?
            (
                allRecipes.map(recipe =>(
                    <div className="d-flex flex-column  " key={recipe.name} style={{width:"30%"}}>
                        <img 
                          src={`${recipe.imgUrl}`}
                          alt="recipe image" 
                          style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
                        />
                        <h4 className="text-center">{recipe.name}</h4>
                        <Link href={`/recipes/recipe/${recipe.id}`} className="align-self-center">
                          <button className="w-50 btn btn-success">See more</button>
                        </Link>
                        
                  </div>
                ))
            )
            :
            (
                <h1 className="text-center p-5">More recipes will appear here!</h1>
            )
        }
        </>
    )
}