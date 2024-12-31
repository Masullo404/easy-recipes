import { getServerSession } from "next-auth"
import { options } from "../api/auth/[...nextauth]/options"
import {Bio, ChangeDescription} from "./local components/change-desc"
import { ChangeImg } from "./local components/change-img"
import ImageProfile from "./local components/profile-img"
import styles from "../../styles/my-profile/style.module.css"


export default async function Profile(){
    const session = await getServerSession(options)
    return (
        <main className={"d-flex p-5 gap-4 bg-light "+styles.main} >
            <div className="d-flex flex-column align-items-center bg-white rounded p-5 shadow-sm justify-content-center">
                <ImageProfile/>
                <p className="h1 mb-3">{session?.user?.name}</p>
                <ChangeImg/>
            </div>
            <div className="d-flex flex-column justify-content-center gap-5">
                <div className="rounded p-5 flex-grow-1 bg-white shadow-sm">
                    <p className="h2">Personal Data:</p>
                    <hr />
                    <span>Your email: </span>
                    <span>{session?.user?.email}</span>
                </div>
                <div className="d-flex flex-column rounded p-5 flex-grow-1 justify-content-center bg-white shadow">
                    <h2>Bio</h2>
                    <Bio/>
                    <ChangeDescription/>
                </div>
            </div>
        </main>
    )
}