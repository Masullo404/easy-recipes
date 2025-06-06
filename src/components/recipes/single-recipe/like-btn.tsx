"use client"
import { useState } from "react"
import { useEffect } from "react"
import { Button } from "react-bootstrap"

export default function LikeBtn({recipeId}:{recipeId:number}){
    const [liked,setLiked] = useState<boolean|null>(false)
    function fetchLike(method:string){
        fetch("/api/Likes/newLike",{
            method:`${method}`,
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({recipeId:recipeId})
        }).then(result => {
            if(result.status === 404) setLiked(null)
            return result.json()
        })
        .then(result => setLiked(result)).catch(err => console.log(err)) 
    }

    useEffect(()=>{
        fetchLike('PUT')
    },[])
    
    function Like(){
        fetchLike('POST')
    }

    return(
        <>
            {
            (liked !== null)?(
            (liked)?
                (
                <Button onClick={Like}><i className="bi bi-hand-thumbs-up-fill"></i> Liked</Button>
                )
                :
                (
                <Button onClick={Like}><i className="bi bi-hand-thumbs-up"></i> Give it a like</Button>
                )
            ):(null)
            }
        </>
    )
}