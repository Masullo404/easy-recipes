"use client"
import { useState,useEffect } from "react"
export default function RecipeViews({recipeId}:{recipeId:number}){
    const [views,setViews] = useState<number|null>(0)
    useEffect(()=>{
        fetch('/api/Views/recipeViews',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({recipeId:recipeId})
        }).then(response => response.json()).then(result => setViews(result)).catch(err => console.log(err))
    },[])
    
    return(
        <>
        {
            (views !== null)? (<span><i className="bi bi-eye"></i>{views}</span>) : (null)
        }
        </>
    )
}