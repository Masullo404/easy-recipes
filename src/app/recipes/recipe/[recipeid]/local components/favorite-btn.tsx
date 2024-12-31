"use client"
import { useState } from "react"
import { useEffect } from "react"
import { Button } from "react-bootstrap"
type props={
    recipeId:number
}

export default function FavoriteBtn(props:props){
    const [favorite,setFavorite] = useState<boolean>(false)
    
    function fetchFavorite(method:string){
        fetch('/api/favorite',{
            method:method,
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({recipeId:props.recipeId})
        }).then(result => result.json())   
        .then(result => setFavorite(result))
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
            {
                (favorite)?
                (
                    <Button onClick={Favorite}><i className="bi bi-heart-fill"></i> Favorite</Button>
                )
                :
                (
                    <Button onClick={Favorite}><i className="bi bi-heart"></i> Bookmark</Button>
                )
            }
        </>
    )
}