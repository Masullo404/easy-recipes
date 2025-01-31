"use server"
import { ChangeDescription} from "../../components/profile/change-desc"
import { ChangeImg } from "../../components/profile/change-img"
import ImageProfile from "../../components/profile/profile-img"
import styles from "../../styles/my-profile/style.module.css"
import { getServerSession } from "next-auth"
import { options } from "../api/auth/[...nextauth]/options"

export default async function Profile(){
    const url = process.env.NEXTAUTH_URL
    const session = await getServerSession(options)
    const userResponse = await fetch(url+'/api/User/getUserBySession',{
        method:"POST",
        headers:{
            "Content-Type":"Application/json"
        },
        body:JSON.stringify({session:session})
    })
    if(!userResponse.ok) {
        return(
        <div style={{height:"80vh"}} className="d-flex justify-content-center align-items-center">
            <div className="alert alert-danger">
                An Error Ocurred when loading user data
            </div>
        </div>
        )
    }
    const user = await userResponse.json()
    return (
        <main className={"d-flex p-5 gap-4 bg-light "+styles.main} >
            <div className="d-flex flex-column align-items-center bg-white rounded p-5 shadow-sm justify-content-center">
                {  (user?.img)?
                (
                <ImageProfile img={user.img}/>
                )
                : 
                (
                    <div className="alert alert-danger" role="alert">
                        An error ocurred when loading your Profile Image
                    </div>
                )
                }
                {(user?.img)?
                (<p className="h1 mb-3">{user.name}</p>)
                : 
                (
                    <div className="alert alert-danger" role="alert">
                        An error when loading your Name
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
                    (
                    <div className="alert alert-danger" role="alert">
                        An error ocurred when loading your Email
                    </div>
                    )}

                </div>
                <div className="d-flex flex-column rounded p-5 flex-grow-1 justify-content-center bg-white shadow">
                    <h2>Bio</h2>
                    {  (user?.bio)? 
                    (
                    <>
                    <p className={styles.bio}>{user.bio}</p>
                    <ChangeDescription bio={user.bio}/>
                    </>
                    ):
                    (
                    <div className="alert alert-danger" role="alert">
                        An error ocurred when loading your Bio
                    </div>
                    )
                    }
                </div>
            </div>
        </main>
    )
}