"use server"
import MyRecentRecipes from "../../components/my-recipes/myRecentRecipes"
import NewRecipeForm from "../../components/my-recipes/form-new-recipe"
import AllRecipes from "../../components/my-recipes/allRecipes"
import styles from "../../styles/my-recipes/style.module.css"
import { options } from "../api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function MyRecipes(){
    const session = await getServerSession(options); 
    if(!session) {
        return redirect('/forms/login')
    }
    const url = process.env.NEXTAUTH_URL
    const tagsResponse = await fetch(url + "/api/Tag/showTags")
    if(!tagsResponse.ok){
        return(
            <div style={{height:"80vh"}} className="d-flex justify-content-center align-items-centerf">
                <div className="alert alert-danger">
                    An error ocurred when loading the tags.
                </div>
            </div>
        )
    }
    const tags = await tagsResponse.json()
    return(
        <>
        <main className={"d-flex justify-content-around p-5 gap-5 bg-light "+styles.main}>
            
            <section className="bg-light flex-grow-1 ml-5 rounded p-5 bg-white shadow-sm">
                <h2 className="text-center">Create new Recipe</h2>
               <NewRecipeForm tags={tags}/>
            </section>

            <section className="bg-white flex-grow-1 p-5 rounded shadow-sm ">
                    <h1>My Recent Recipes</h1>
                    <hr />
                    <div>
                        <MyRecentRecipes />
                    </div>
            </section>
        </main>
        <AllRecipes />
        </>
    )
}