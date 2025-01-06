"use client"
import Link from "next/link"
import { Button } from "react-bootstrap"
import styles from "../../../styles/forms/register.module.css"
import { FormEvent, useState } from "react"

export default function RegisterForm(){
    const [name,setName] = useState<string>('')
    const [email,setEmail]= useState<string>('')
    const [password,setPassword]= useState<string>('')
    const [error,setError] = useState<boolean>(false)
    const [errorMessage,SetMessage] = useState<string>('')
    async function SendForm(ev:FormEvent) {
        ev.preventDefault()
        if(name.length === 0 || password.length === 0 || password.length === 0){
            setError(true)
            SetMessage('You must fill all the fields correctly !')
        }else{
            const response = await fetch('/api/register',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({name:name,email:email,password:password})
            })
            if(response.redirected === true){
                window.location.href = response.url
            }else{
                const data = await response.json()
                setError(true)
                SetMessage(data.message)
            }
        }
    }
    return(
        <main className="h-100 ">
            <nav className="p-3">
                <Link href={"/"} className="h1 text-decoration-none text-light ">Easy Recipes</Link>
            </nav>
            <section className="d-flex w-100 justify-content-center align-items-center" style={{height:"90%"}}>
                <form onSubmit={SendForm}
                className={"d-flex flex-column bg-light d-flex flex-column justify-content-center rounded align-items-center p-3 "+styles.registerForm}
                    style={{height:"65%",width:"35%"}}
                >
                    <h1 className="text-center mb-5 pb-5 ">Register</h1>
                    <label htmlFor="name" className="w-100" >Enter your name</label>
                    <input type="text" className="w-100" name="name" onChange={(ev) => setName(ev.target.value)}/>
                    <label htmlFor="email" className="w-100">Enter your email</label>
                    <input type="text" className="w-100" name="email" onChange={(ev) => setEmail(ev.target.value)}/>
                    <label htmlFor="password" className="w-100">Enter your password</label>
                    <input type="password" className="w-100" name="password" onChange={(ev) => setPassword(ev.target.value)}/>
                    <Button type="submit" className="w-50 my-5 text-center">Submit</Button>
                    { (error)? 
                    (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                    )
                    :
                    (
                        null
                    )
                    }
                    <   p>Already have an account?<Link href={"/forms/login"} className="mt-5">Login</Link></p>
                </form>    
            </section>
        </main>
    )
}