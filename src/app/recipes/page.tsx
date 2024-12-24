"use client"
import { FormEvent, useEffect } from "react";
import { useState } from "react";
import CustomizedCarousel from "@/components/home-page/carousel";
import { recipes } from "../my_recipes/myRecentRecipes";
import Link from "next/link";

export default function Recipes(){
    const [recentRecipes,setRecentRecipes] = useState<recipes|null>(null)
    const [recipes,setRecipes] = useState<recipes|null>(null)
    const [recents,setRecents] = useState<boolean>(false)
    const [mostV,setMostV] = useState<boolean>(false)
    

    if(recentRecipes === null)    {
        fetch("/api/mostViewedRecipes",{
                method:"GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(result => result.json())
        .then(result => setRecentRecipes(result))
        .catch(err => console.log(err))
    }
    if(recipes === null){
        fetch("/api/search/advanced",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({recents:recents,mostV:mostV})
        }).then(result => result.json())
        .then(result => setRecipes(result))
        .catch(err => console.log(err)) 
    }

    function AdvancedSearch(ev:FormEvent){
        ev.preventDefault()
        fetch("/api/search/advanced",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({recents,mostV})
        }).then(result => result.json())
        .then(result => setRecipes(result))
        .catch(err => console.log(err))
        console.log(recents)
        console.log(mostV)
    }

    return (
        <>
            <CustomizedCarousel  items={
                [
                    {
                        src:"https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                        title:"Easy Recipes 1",text:"One"
                    },
                    {
                        src:"https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=600",
                        title:"Easy Recipes 2",text:"two"
                    },
                    {
                        src:"https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600",
                        title:"Easy Recipes 3",text:"Three"
                    },
                    {
                        src:"https://images.pexels.com/photos/803963/pexels-photo-803963.jpeg?auto=compress&cs=tinysrgb&w=600",
                        title:"Easy Recipes 4",text:"Four"
                    }
                ]}   />
            <section className="pl-5 pr-5">
                    <h1 className="text-center mt-5">See the most viewed Recipes</h1>
                    <div className="d-flex justify-content-center">
                        <hr className="text-center w-75"/>
                    </div>
                    <div className="d-flex flex-wrap p-5 gap-5">
                        { recentRecipes && recentRecipes.map((recipe)=>(
                            <div key={recipe.id} className="d-flex flex-column justify-content-between" style={{width:"30%"}}>
                                <img src={recipe.imgUrl} alt="image" style={{objectFit:"cover"}} className="img-fluid" />
                                <p className="text-center">{recipe.name}</p>
                                <p>{recipe.description}</p>
                                <Link href={`/recipes/recipe/${recipe.id}`} className="align-self-center">
                                    <button className="btn btn-success">See More</button>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <hr />
                </section>
                <div>
                    <h1 className="text-center mt-5">Search Recipes</h1>
                </div>
                <section className="d-flex" style={{padding:"1rem 10rem 1rem 10rem"}}>
                <div className="w-25 rounded p-3" style={{backgroundColor:"#FBF6E9"}}>
                    <p>Filter Options</p>
                    <form className="pb-4" onSubmit={AdvancedSearch}>
                    <p>Tags</p>
                        <input type="checkbox" name="recents" checked={recents} onChange={(ev)=>setRecents(Boolean(ev.target.checked))}/>
                        <label htmlFor="recents">Recents</label> <br />
                        <input type="checkbox" name="most viewed"  checked={mostV} onChange={(ev)=>setMostV(Boolean(ev.target.checked))}/>
                        <label htmlFor="most viewed">Most viewed</label> <br />
                        <hr />
                        <button type="submit" className="btn btn-success">Filter</button>
                    </form>
                </div>
                <div className="w-75 d-flex flex-wrap justify-content-center gap-5">
                    {recipes &&  recipes.map(recipe => (
                            <div style={{width:"40%"}}  key={recipe.id}>
                                <img src={recipe.imgUrl} alt="recipe image" className="w-100 img-fluid"/>
                                <p className="h3">{recipe.name}</p>
                                <Link href={`/recipes/recipe/${recipe.id}`}><button>See more</button></Link>
                            </div>
                        ))
                    }
                </div>  
            </section>
        </>
    )
}