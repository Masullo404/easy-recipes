"use client"
import Image from "next/image"
import { recipe, user } from "@prisma/client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"
import { Button } from "react-bootstrap"
import style from "../../../styles/user-page/style.module.css"
export default function UserPage(){
    const params = useParams()
    const userId:number = Number(params.userid)
    const [user,setUser] = useState<user|null>(null)
    const [recipe,setRecipe] = useState<recipe|null>(null)
    const [otherRecipes,setOther] = useState<recipe[]|null>(null)
    if(!user){
        fetch("/api/userById",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({userId:Number(userId)})
        }).then(result => result.json())
        .then(result =>{
            setUser(result.user)
            setRecipe(result.recipe)
        }).catch(err => console.log(err))
    }
    if(!otherRecipes) {
        fetch("/api/userById/userRecipes",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({userId:Number(userId)})
        }).then(result => result.json())
        .then(result =>setOther(result.slice(0,4)))
        .catch(err => console.log(err))
    }
    return(
        <main className="bg-light">
            <section className={"d-flex p-5 gap-5 "+style.main}>
                
                <div className=" bg-white rounded shadow-sm">
                    {user && <Image src={String(user?.img)} alt={'user profile image'} height={500} width={500} 
                    className="w-100 rounded img-fluid"/>}
                    <p className="h2 text-center pb-3">{user?.name}</p>
                </div>
                
                <div className=" d-flex flex-column justify-content-between gap-5 bg-white rounded shadow-sm p-4">
                    <div>
                        <p className="h4">Bio</p>
                        <p>{user?.bio}</p>
                        <hr />
                    </div>

                    <div className=" d-flex justify-content-between ">
                        
                        {(!recipe)?
                        (
                        <h1>No liked recipes</h1>
                        )
                        :
                        (
                        <div className="d-flex  w-100">
                            <img src={recipe.imgUrl} alt="recipe image" className="w-50 img-fluid" />
                            <div className="w-50 d-flex flex-column align-items-center justify-content-center">
                                <p>Most Liked Recipe:{recipe.name}</p>
                                <Link href={`/recipes/recipe/${recipe.id}`}><Button>See more</Button></Link>
                            </div>
                        </div>
                        )
                        }
                    </div>
                </div>
            </section>
            <section className="d-flex gap-5 p-5 flex-wrap justify-content-center">
                    { otherRecipes && otherRecipes.filter(recipes => recipes.id !== recipe?.id ).map(recipe => (
                        <div className={"w-25 bg-white rounded shadow-sm "+style.recipes}>
                             <Image src={recipe.imgUrl} alt="recipe image" height={500} width={500} className="w-100 img-fluid"/> 
                            <div className="p-4 ">
                                <p className="h3">{recipe.name}</p>
                                <Link href={`/recipes/recipe/${recipe.id}`}><Button>See more</Button></Link>
                            </div>
                        </div>
                    ))

                    }
            </section>
        </main>
    )
}