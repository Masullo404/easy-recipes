"use client"
import { useState } from "react"
import { useEffect } from "react"
import { Button } from "react-bootstrap"

type props = {
    recipeId:number
}
export default function LikeBtn(props:props){
    const [liked,setLiked] = useState<boolean>(false)
    
    function fetchLike(method:string){
        fetch("/api/newLike",{
            method:`${method}`,
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({recipeId:props.recipeId})
        }).then(result => result.json())
        .then(result => setLiked(Boolean(result)))
        .catch(err => console.log(err)) 
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
                (liked)?
                (
                <Button onClick={Like}><i className="bi bi-hand-thumbs-up-fill"></i> Liked</Button>
                )
                :
                (
                <Button onClick={Like}><i className="bi bi-hand-thumbs-up"></i> Give it a like</Button>
                )
            }
        </>
    )
}