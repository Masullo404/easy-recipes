"use client"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { FormEvent, useState } from "react"
import Image from "next/image"
import { Button } from "react-bootstrap"
import styles from "../../../styles/forms/login.module.css"

export default function Login(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState<boolean>(false)
    const [message,setMessage] = useState<string>('')
    const [show,setShow] = useState<string>('password')

    async function  HandleSubmit(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault()
        
        const result = await signIn("credentials",{
            email:email,
            password:password,
            redirect:false
        })
        if(!result?.error){
            window.location.href = "/profile"
        }else{
            setError(true)
            setMessage('Invalid email or password, please try again.')
        }
    }

    return (
       <div className={"d-flex "+styles.loginMain}>
        <div className={"login "+styles.loginFormDiv}>
            <nav className={"p-3"}>
                <Link href={"/"} className="text-decoration-none text-light h1">Easy Recipes</Link>
            </nav>

            <section className="d-flex flex-column  p-5 justify-content-start align-items-center bg-white shadow" style={{height:"83%"}}>
                <h1 className="w-100 p-5 text-center">Sign up to Easy Recipes</h1>
                <form onSubmit={(ev)=>HandleSubmit(ev)} className="d-flex flex-column w-50 justify-content-center">
                    <label htmlFor="email" className=" mb-3" >E-mail</label>
                    <input type="text" className="p-2 mb-4" name="email" placeholder="JhonDoe@gmail.com" 
                    onChange={(ev) => setEmail(ev.target.value)}/>
                    <label htmlFor="password">Password</label>
                    <div className="d-flex ">
                        <input type={show} className="p-2 ps-5 mb-3 w-100" name="password" placeholder=""
                        onChange={(ev)=> setPassword(ev.target.value)} 
                        />
                        { (show === "password")?
                        (
                            <button className="position-absolute mt-2 ms-1 bg-white border-0" onClick={()=>setShow('text')} type="button">
                                <i className="bi bi-eye"></i>
                            </button>
                        )
                        :
                        (
                            <button className="position-absolute mt-2 ms-1 bg-white border-0" onClick={()=>setShow('password')} type="button">
                                <i className="bi bi-eye-slash"></i>
                            </button>
                        )}
                    </div> 
                    <Button type="submit">Submit</Button>
                </form>
            {(error)?
            (
            <div className="alert alert-danger mt-5" role="alert">
                {message}
            </div>
            )
            :
            (
                null
            )
            }
            </section>
            <footer className="text-center bg-white ">
                <p>Don&apos;t have an account? <Link href={"/forms/register"}>Register</Link></p>
            </footer>
        </div>
        <div className={styles.loginImgDiv}>
            <Image src="https://cdn.pixabay.com/photo/2016/12/10/21/26/food-1898194_640.jpg" alt="food image"
            height={500} width={500} className="w-100 h-100 object-fit-cover"/>   
        </div>
       </div>
    )
}