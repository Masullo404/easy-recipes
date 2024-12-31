import Link from "next/link"
import { Button } from "react-bootstrap"

export default function RegisterForm(){
    return(
        <main className="h-100 ">
            <nav className="p-3">
                <Link href={"/"} className="h1 text-decoration-none text-light ">Easy Recipes</Link>
            </nav>
            <section className="d-flex w-100 justify-content-center align-items-center" style={{height:"90%"}}>
                <form action="/api/register" method="post" 
                className="d-flex flex-column bg-light d-flex flex-column justify-content-center rounded align-items-center p-3"
                    style={{height:"65%",width:"35%"}}
                >
                    <h1 className="text-center mb-5 pb-5 ">Register</h1>
                    <label htmlFor="name" className="w-100" >Enter your name</label>
                    <input type="text" className="w-100" name="name"/>
                    <label htmlFor="email" className="w-100">Enter your email</label>
                    <input type="text" className="w-100" name="email"/>
                    <label htmlFor="password" className="w-100">Enter your password</label>
                    <input type="password" className="w-100" name="password"/>
                    <Button type="submit" className="w-50 my-5 text-center">Submit</Button>
                    <p>Already have an account?<Link href={"/forms/login"} className="mt-5">Login</Link></p>
                </form>    
                
            </section>
        </main>
    )
}