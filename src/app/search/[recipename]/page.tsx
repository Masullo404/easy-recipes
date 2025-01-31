import { recipe } from "@prisma/client"
import Link from "next/link"
import { Button } from "react-bootstrap"
import Image from "next/image"
import styles from "../../../styles/search/style.module.css"

export default async function Search({params}:{params:{recipename:string}}){
    const words = params.recipename
    const url = process.env.NEXTAUTH_URL
    const recipesResponse = await fetch(url+"/api/Recipes/search",{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({param:words})
    })
    if(!recipesResponse.ok){
        return(
            <div style={{height:"80vh"}} className="d-flex justify-content-center align-items-center">
                <div className="alert alert-danger">
                    An error ocurred when trying to render recipes that include &apos;{words}&apos;
                </div>
            </div>
        )
    }
    const recipes:recipe[] = await recipesResponse.json()

    return(
        <main className="bg-light">
            <main className="d-flex flex-column align-items-center p-5">
                {(recipes.length >= 1)? 
                    (
                        <>
                            <h1>See recipes that contain:&quot;{words}&quot;</h1>
                            <div className="d-flex flex-wrap p-5 gap-5 justify-content-center" style={{minHeight:"80vh"}}>
                                {
                                    recipes.map(recipe =>(
                                        <div key={recipe.name} style={{width:"30%"}} className={"bg-white rounded shadow-sm "+styles.recipes}>
                                            <Image src={recipe.imgUrl} width={400} height={350} alt="recipe image" className="rounded w-100"/>
                                            <div className="d-flex flex-column ps-4 pt-5 pb-3">
                                                <p className="h3">{recipe.name}</p>
                                                <p>{recipe.description.slice(0,40)}...</p>
                                                <Link href={`/recipes/recipe/${recipe.id}`}><Button>See more</Button></Link>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    )
                    :
                    (
                    <>
                        <div className="d-flex flex-column justify-content-center align-items-center" style={{height:'75vh'}}>
                            <h1 className="h-">No recipes found with:&quot;{words}&quot;</h1>
                            <p className="display-1">Please try a valid search</p>
                        </div>
                    </>
                    )
                }
            </main>
        </main>
    )
}