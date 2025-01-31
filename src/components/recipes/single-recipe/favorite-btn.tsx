"use client"
import { useState } from "react"
import { useEffect } from "react"
import { Button } from "react-bootstrap"

export default function FavoriteBtn({recipeId}:{recipeId:number}){
    const recipeIdNumber = Number(recipeId)
    const [favorite,setFavorite] = useState<boolean|null>(false)
    function fetchFavorite(method:string){
        fetch('/api/Likes/favorite',{
            method:method,
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({recipeId:recipeIdNumber})
        }).then(result => {
            if(result.status === 404) setFavorite(null);
            return result.json();
        }).then(result => setFavorite(result))
        .catch(err => console.log(err))
    }
    useEffect(()=>{
        fetchFavorite('PUT')
    },[])

    function Favorite(){
        fetchFavorite('POST')
    }
    return(
        <>
            {(favorite !== null)?(
            (favorite)?
                (
                    <Button onClick={Favorite}><i className="bi bi-heart-fill"></i> Favorite</Button>
                )
                :
                (
                    <Button onClick={Favorite}><i className="bi bi-heart"></i> Bookmark</Button>
                )
            ):(null)
            }
        </>
    )
}