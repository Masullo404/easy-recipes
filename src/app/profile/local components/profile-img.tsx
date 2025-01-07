"use client"
import Image from "next/image"
import styles from "../../../styles/my-profile/style.module.css"
export default function ImageProfile({img}:{img:string}){
    return(
        <>
        {
         img && <Image src={img} alt="user image profile" height={500} width={500} className={"img-fluid "+styles.profileImg}/>
        }
        </>
    )
}