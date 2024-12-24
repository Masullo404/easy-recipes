"use client"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { FormEvent, useState } from "react"

export default function Login(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')


    async function  HandleSubmit(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault()
        
        const result = await signIn("credentials",{
            email:email,
            password:password,
            redirect:false
        })
        if(!result?.error){
            window.location.href = "/"
        }
    }

    return (
       <div style={{height:"100vh",width:'100vw'}} className="d-flex ">
        <div className="login bg-light w-50">
        <nav style={{backgroundColor:"orange"}} className="p-3">
            <Link href={"/"} className="text-decoration-none text-light h1">Easy Recipes</Link>
        </nav>
        <section className="d-flex flex-column  p-5 justify-content-start align-items-center" style={{height:"87%"}}>
            <h1 className="w-100 p-5 text-center">Sign up to Easy Recipes</h1>
            <form onSubmit={(ev)=>HandleSubmit(ev)} className="d-flex flex-column w-50 justify-content-center">
                <label htmlFor="email" className=" mb-3" >E-mail</label>
                <input type="text" className="p-2 mb-4" name="email" placeholder="JhonDoe@gmail.com" 
                onChange={(ev) => setEmail(ev.target.value)}/>
                <label htmlFor="password">Password</label>
                <input type="password" className="p-2 mb-3" name="password" placeholder="*****"
                onChange={(ev)=> setPassword(ev.target.value)}/>
                <button type="submit"  className="btn btn-success mt-4">Submit</button>
            </form>
        </section>
        <footer className="text-center">
            <p>Don't have an account? <Link href={"/forms/register"}>Register</Link></p>
        </footer>
        </div>
        <div className="w-50">
            <img src="https://cdn.pixabay.com/photo/2016/12/10/21/26/food-1898194_640.jpg" 
            alt="food" style={{height:"100%",width:"100%",objectFit:"cover"}}/>
        </div>
       </div>
    )
}