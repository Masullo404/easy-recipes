"use client"
import { tags } from "@prisma/client"
import { useState } from "react"

export default function ShowTags(){
    const [tags,setTags] = useState<tags[]|null>(null)
    if(!tags){
        fetch('/api/Tag/showTags',{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            }}).then(res => res.json())
            .then(res => setTags(res))
            .catch(err => console.log(err))
    }
   
    return(
        <>
        {(tags)?( tags.map(tag => (
            <div className="bg-primary rounded m-3 p-2 w-100 text-white" key={tag.id} >
                <input type="checkbox" name={tag.name} id={tag.name}  className="mx-3"/>  
                <label htmlFor={tag.name}>{tag.name}</label>
                <br />
            </div>
        )))
        :
        (
            <>
                <p className="h4">No Tags available</p>
            </>
        )
        }
        </>
    )
}