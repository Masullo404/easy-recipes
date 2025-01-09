"use client"
import ImageInput from "@/app/my_recipes/local components/image-input"
import { FormEvent, useState } from "react"
import { Button } from "react-bootstrap"
import ShowTags from "./showTags"
import styles from "../../../styles/my-recipes/style.module.css"

export default function NewRecipeForm(){
    const [description,setDescription] = useState<string>('')
    function verifyDescription(ev:FormEvent){
        if(description.length <= 80){
            ev.preventDefault()
            alert('The recipe description must have at least 80 caracters')
        }
    }
    return(
       <form action={"/api/Recipes/newRecipe"} method="post"
        className="ml-5 mr-5 d-flex flex-column align-items-center gap-5" encType="multipart/form-data">
            <div className={"d-flex justify-content-between gap-5 w-75 "+styles.formDiv} >
                <div className="d-flex flex-column">
                    <label htmlFor="name" className="h3 ">Recipe Name</label>
                    <input type="text" name="recipe name" placeholder="EX: Sweet Popcorn"/>

                    <label htmlFor="descripion" className="h3 mt-5 mb-3">Describe how to prepare it</label>
                    <textarea name="description" id="description" placeholder="You're going to need..."
                    className="recipe-description-input" rows={15} value={description} onChange={(ev)=>setDescription(ev.target.value)}></textarea>
                </div>

                <div className={"d-flex flex-column "}>
                    <ImageInput/>
                    <div className="pt-5 w-75">
                        <p className="h4">Add Tags to your recipe:</p>
                        <ShowTags/>
                    </div>
                </div>  
                
            </div>
            <Button type="submit" className="mb-5 mt-5 fs-5" onClick={verifyDescription}>Publish</Button>
        </form>
    )
}