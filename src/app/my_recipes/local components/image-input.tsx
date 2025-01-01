"use client"
import { useState } from "react"
import React from "react"
import Image from "next/image"
export default function ImageInput(){
    const [img,setImg] = useState<null|string>(null)
    function OnFileSubmit (ev:React.ChangeEvent<HTMLInputElement>) {
        const file = ev.target.files?.[0]
        if(file) {
            const imageUrl = URL.createObjectURL(file);
            setImg(imageUrl);
        }
    }
    return(
        <>
            <label htmlFor="image" className="h3">Select the Recipes&apos;image</label>
            <input type="file" name="image" onChange={OnFileSubmit} accept="image/jpg"/>
            { img && 
            (
                <div className="p-5">
                    <p className="h4">Image Preview:</p>
                    <Image src={img} alt="selected image"height={200} width={200} style={{ maxWidth: "200px", height: "auto" }} />
                </div>
            )
            }
        </>
    )
}