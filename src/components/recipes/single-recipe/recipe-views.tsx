"use server"
import { Spinner } from "react-bootstrap"

export default async function RecipeViews({recipeId}:{recipeId:number}){
    const url = process.env.NEXTAUTH_URL
    const viewsResponse = await fetch(url+'/api/Views/recipeViews',{
        method:"POST",
        headers:{
            "Content-Type":"Application/json"
        },
        body:JSON.stringify({recipeId:recipeId})
    })
    if(!viewsResponse.ok){
        return(
            <>
                <div className="alert alert-danger">
                    An error ocurred when rendering the recipes:&Apos; views
                </div>
            </>
        )
    }
    const views:number = await viewsResponse.json()
    
    return(
        <>
        {
            (views !== null)? 
            (
            <span><i className="bi bi-eye"></i>{views}</span>
            ) 
            : 
            (
                <Spinner />
            )
        }
        </>
    )
}