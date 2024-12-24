"use client"
import Link from 'next/link'
import styles from "../../styles/nav.module.css"
import { Button } from 'react-bootstrap'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { use, useState } from 'react'

export default  function MainNav(){
    const {data:session,status} = useSession()
    const logOut = () => signOut()
    const [search,setSearch] = useState('')
    return (
        <nav className={styles.navMenu}>
            <div className={styles.title}>
                <Link href={"/"} className='text-decoration-none text-light'><h1>Easy Recipes</h1></Link>                
            </div>

            <div>
                <form action={"/search/"+search} method="get">
                    <input type="text" onChange={(ev)=>setSearch(ev.target.value)} 
                    placeholder="Search for recipes" className={styles.search}/>
                </form>
            </div>
            
            <div className={styles.links}>
                <Link href={"/recipes"}>Recipes</Link>
                {(status === "unauthenticated")?
                (<Link href={"/forms/login"}><Button className='btn btn-success pt-3 pb-3 pl-5 pr-5'>Login</Button></Link>)
                :
                (
                    <>
                    <Link href={"/profile"}>Profile</Link>
                    <Link href={"/my_recipes"}>My recipes</Link>
                    <Button onClick={logOut}>Logout</Button>
                    </>
                )
                }
                
            </div>
        </nav>
    )

}