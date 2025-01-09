"use client"
import Image from "next/image";
import { FormEvent, useEffect } from "react";
import { useState } from "react";
import { Button, Carousel } from "react-bootstrap";
import { recipe } from "@prisma/client";
import Link from "next/link";
import styles from "../../styles/recipes/recipes-page.module.css";

export default function Recipes(){
    const [recentRecipes,setRecentRecipes] = useState<recipe[]|null>(null)
    const [recipes,setRecipes] = useState<recipe[]|null>(null)
    const [recents,setRecents] = useState<boolean>(false)
    const [mostV,setMostV] = useState<boolean>(false)

    useEffect(()=>{
        fetch("/api/Recipes/mostViewedRecipes",{
                method:"GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(result => result.json())
        .then(result => setRecentRecipes(result))
        .catch(err => console.log(err))
        
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

    return (
        <main className="bg-light">
            <Carousel>
                <Carousel.Item>
                    <Image src="https://images.pexels.com/photos/5718029/pexels-photo-5718029.jpeg?auto=compress&cs=tinysrgb&w=600"
                    width={500} height={500}
                    alt="responsive img" className='img-fluid w-100 ' style={{height:"60vh",objectFit:"cover",filter:"brightness(0.7)"}}
                    />        
                    <Carousel.Caption  className='h-100 p-0 d-flex flex-column justify-content-center' >
                    <div className='text-start'>
                        <p className="h1">Find Your Recipes Here</p>
                        <p className='w-75'>Easy Recipes</p>
                    </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <Image src="https://images.pexels.com/photos/5718074/pexels-photo-5718074.jpeg?auto=compress&cs=tinysrgb&w=600"
                    width={500} height={500}
                    alt="responsive img" className='img-fluid w-100 ' style={{height:"60vh",objectFit:"cover",filter:"brightness(0.7)"}}
                    />
                    <Carousel.Caption  className='h-100 p-0 d-flex flex-column justify-content-center' >
                    <div className='text-start'>
                        <p className="h1">Easy and Simple</p>
                    </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <section className="pl-5 pr-5">
                    <h1 className="text-center mt-5">See the most viewed Recipes</h1>
                    <div className="d-flex justify-content-center">
                        <hr className="text-center w-75"/>
                    </div>
                    <div className="d-flex flex-wrap p-5 gap-5 h-100">
                        { 
                        (recentRecipes)?
                        (
                            recentRecipes.map((recipe)=>(
                                <div key={recipe.id} className={"d-flex justify-content-between rounded bg-white shadow-sm "+styles.mostViewed}>
                                    <Image src={recipe.imgUrl} width={500} height={500} alt="food image" className={"img-fluid w-50 rounded object-fit-cover "+styles.mostViewedImg }/>
                                    <div className="d-flex flex-column gap-3 p-3 w-50 justify-content-around">
                                        <p className="text-center h4">{recipe.name}</p>
                                        <p>{recipe.description.slice(0,50)}...</p>
                                        <Link href={`/recipes/recipe/${recipe.id}`} className="align-self-center">
                                            <Button>See The recipe</Button>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )
                        :
                        (
                            <div className="alert alert-danger" role="alert">
                            A simple danger alert—check it out!
                            </div>
                        )
                        }
                    </div>
                    <hr />
            </section>
            <div>
                <h1 className="text-center mt-5">Search Recipes</h1>
            </div>
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
                                    <Image src={recipe.imgUrl} width={500} height={500} alt="recipe image" className="w-100 img-fluid rounded"/>
                                    <div className="d-flex flex-column gap-3 p-3">
                                        <p className="h3">{recipe.name}</p>
                                        <Link href={`/recipes/recipe/${recipe.id}`}><Button>See more</Button></Link>
                                    </div>
                                </div>
                        ))
                    )
                    :
                    (
                        <div className="alert alert-danger d-flex aling-items-center" role="alert">
                            <p>An Error Ocurred, Please Try Again Later!</p>
                        </div>
                    )
                    }
                </div>  
            </section>
        </main>
    )
}