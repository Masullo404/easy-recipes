"use client"
import { Button } from "react-bootstrap"
import styles from "../../styles/layout/footer.module.css"
import Link from "next/link"
import { useState } from "react"
export default function MainFooter(){
    const [search,setSearch] = useState<string>('')
    return(
        <>
        <footer className={styles.footer+" text-center p-4 justify-content-between align-items-center gap-5"}>

            <div>
                <nav className={"d-flex gap-5 justify-content-start align-items-center h-75 "+styles.navFooter}>
                    <Link href={"/"} className="text-decoration-none text-light">Home</Link>
                    <Link href={"/recipes"} className="text-decoration-none text-light">Recipes</Link>
                    <Link href={`/recipes/tag/easy-to-do`} className="text-decoration-none text-light">Easy-to-do</Link>
                    <Link href={"/recipes/tag/spicy-food"} className="text-decoration-none text-light">Spicy Food</Link>
                </nav>
            </div>

            <div className="gap-5 ">   
               <form action={`/search/${search}`} className="d-flex gap-3">
                <input type="text" placeholder="search a recipe" onChange={(ev) => setSearch(ev.target.value)} />
                <Button type="submit">Submit</Button>
               </form>
            </div>

            <div className={" justify-content-center d-flex flex-column grow-1"}>
                <span className="fs-6">developed by <Link href={'https://github.com/Masullo404'}>João Masullo</Link></span>
                <i className="bi bi-github"></i>
            </div>

        </footer>
        </>
    )
}