"use client"
import { recipe } from "@prisma/client"
import { FormEvent, useEffect, useState } from "react"
import styles from "../../styles/recipes/recipes-page.module.css";
import { Button, Spinner } from "react-bootstrap";
import Link from "next/link";
export default function SearchRecipes() {
    const [recipes,setRecipes] = useState<recipe[]|null>(null)
    const [recents,setRecents] = useState<boolean>(false)
    const [mostV,setMostV] = useState<boolean>(false)

    useEffect(()=>{
        fetch("/api/Recipes/search/advanced",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({recents:recents,mostV:mostV})
        }).then(result => result.json())
        .then(result => setRecipes(result))
        .catch(err => console.log(err)) 
    },[])

    function AdvancedSearch(ev:FormEvent){
        ev.preventDefault()
        fetch("/api/Recipes/search/advanced",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({recents,mostV})
        }).then(result => result.json())
        .then(result => setRecipes(result))
        .catch(err => console.log(err))
    }

    return(
        <>
        <section className={"d-flex "+styles.searchSection}>
            <div className={"rounded p-3 bg-white shadow me-5 h-75 "+styles.filterCard}>
                <p>Filter Options</p>
                <form className="pb-4 " onSubmit={AdvancedSearch}>
                <p>Tags</p>
                    <input type="checkbox" name="recents" checked={recents} onChange={(ev)=>setRecents(Boolean(ev.target.checked))}/>
                    <label htmlFor="recents">Recents</label> <br />
                    <input type="checkbox" name="most viewed"  checked={mostV} onChange={(ev)=>setMostV(Boolean(ev.target.checked))}/>
                    <label htmlFor="most viewed">Most viewed</label> <br />
                    <hr />
                    <Button type="submit">Filter</Button>
                </form>
            </div>
            <div className="w-75 d-flex flex-wrap justify-content-center gap-5">
                {
                (recipes)?
                (
                    recipes.slice(0,9).map(recipe => (
                    <div className={"d-flex flex-column gap-3 bg-white rounded shadow-sm grow-1 "+styles.recipes} key={recipe.id}>
                        <img src={recipe.imgUrl} width={500} height={500} alt="recipe image" className={"w-100 img-fluid rounded object-fit-cover "+styles.SearchImages}/>
                        <div className="d-flex flex-column gap-3 p-3">
                            <p className="h3">{recipe.name}</p>
                            <p>{recipe.description.slice(0,100)+"..."}</p>
                            <Link href={`/recipes/recipe/${recipe.id}`}><Button>See more</Button></Link>
                        </div>
                    </div>
                    ))
                )
                :
                (
                    <div className="alert alert-secondary d-flex aling-items-center p-5 d-flex justify-content-center align-items-center" role="alert">
                        <Spinner />
                        <br />
                        <p className="h2">Loading Recipes</p>
                    </div>
                )
                }
            </div>  
        </section>
        </>
    )
}