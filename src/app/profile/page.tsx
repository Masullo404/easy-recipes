"use client"
import { ChangeDescription} from "./local components/change-desc"
import { ChangeImg } from "./local components/change-img"
import ImageProfile from "./local components/profile-img"
import styles from "../../styles/my-profile/style.module.css"
import { useState,useEffect } from "react"
import { user } from "@prisma/client"

export default function Profile(){
    const [user,setUser] = useState<user|null>(null)
    useEffect(()=>{
        fetch('/api/getUserBySession').then(res => res.json()).then(res => setUser(res)).catch(err => console.log(err))
    },[])
    return (
        <main className={"d-flex p-5 gap-4 bg-light "+styles.main} >
            <div className="d-flex flex-column align-items-center bg-white rounded p-5 shadow-sm justify-content-center">
                {  (user?.img)?
                (<ImageProfile img={user.img}/>)
                : (
                    <div className="alert alert-danger" role="alert">
                        An error ocurred to load your profile image
                    </div>
                )
                }
                {(user?.img)?
                (<p className="h1 mb-3">{user.name}</p>)
                : (
                    <div className="alert alert-danger" role="alert">
                        An error ocurred to load your UserName
                    </div>
                )
                }
                {  (user?.img)? (<ChangeImg/>): (null) }
            </div>
            <div className="d-flex flex-column justify-content-center gap-5">
                <div className="rounded p-5 flex-grow-1 bg-white shadow-sm">
                    <p className="h2">Personal Data:</p>
                    <hr />
                    <span>Your email: </span>
                    {(user?.email)?
                    (<span>{user?.email}</span>)
                    :
                    (<div className="alert alert-danger" role="alert">
                        An error ocurred to load your Email
                    </div>)
                    }

                </div>
                <div className="d-flex flex-column rounded p-5 flex-grow-1 justify-content-center bg-white shadow">
                    <h2>Bio</h2>
                    {  (user?.bio)? 
                    (
                    <>
                    <p className={styles.bio}>{user.bio}</p>
                    <ChangeDescription bio={user.bio}/>
                    </>
                    ):(
                    <div className="alert alert-danger" role="alert">
                        An error ocurred to load your Bio
                    </div>
                    )
                    }
                </div>
            </div>
        </main>
    )
}