import { getServerSession } from "next-auth"
import { options } from "../api/auth/[...nextauth]/options"
import { Button } from "react-bootstrap"
import {Bio, ChangeDescription} from "./change-desc"
import { ChangeImg } from "./change-img"
import ImageProfile from "./profile-img"

export default async function Profile(){
    const session = await getServerSession(options)
    const userImage = session?.user?.image
    return (
        <>
            <main className="d-flex p-5 gap-4" style={{backgroundColor:"#F5F6FA",height:"80vh"}} >
                <div className="d-flex w-50 flex-column align-items-center  rounded p-5" style={{backgroundColor:"white"}}>
                    <ImageProfile/>
                    <p className="h1 mb-3">{session?.user?.name}</p>
                    <ChangeImg/>
                </div>
                <div className="d-flex flex-column w-50  justify-content-center gap-5 ">
                    <div style={{backgroundColor:"white"}} className="rounded p-5 flex-grow-1">
                        <p className="h2">Personal Data:</p>
                        <hr />
                        <span>Your email: </span>
                        <span>{session?.user?.email}</span>
                    </div>
                    <div style={{backgroundColor:"white"}} className="d-flex flex-column rounded p-5 flex-grow-1 justify-content-center">
                        <h2>Bio</h2>
                        <Bio/>
                        <ChangeDescription/>
                    </div>
                </div>
            </main>
        </>
    )
}