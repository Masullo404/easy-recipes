"use client"
import { useState } from "react"
type props = {
    recipeId:number
}
export default function RecipeViews(props:props){
    const [views,setViews] = useState<number>(0)
    if(!views){
        fetch('/api/recipeViews',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({recipeId:props.recipeId})
        }).then(response => response.json())
            .then(result => setViews(result))
            .catch(err => console.log(err))
    }
    if(typeof views !== "number"){
        setViews(0)
    }
    return(
        <span><i className="bi bi-eye"></i>{views}</span>
    )
}