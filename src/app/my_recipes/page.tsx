import {MyRecentRecipes} from "./local components/myRecentRecipes"
import NewRecipeForm from "./local components/form-new-recipe"
import AllRecipes from "./local components/allRecipes"
import styles from "../../styles/my-recipes/style.module.css"
import { options } from "../api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
export default async function MyRecipes(){
    const session = await getServerSession(options); 
    if (!session) {
        return redirect('/forms/login')
      }
    return(
        <>
        <main className={"d-flex justify-content-around p-5 gap-5 bg-light "+styles.main}>
            
            <section className="bg-light flex-grow-1 ml-5 rounded p-5 bg-white shadow-sm">
                <h2 className="text-center">Create new Recipe</h2>
               <NewRecipeForm/>
            </section>

            <section className="bg-white flex-grow-1 p-5 rounded shadow-sm ">
                    <h1>My Recent Recipes</h1>
                    <hr />
                    <div>
                        <MyRecentRecipes />
                    </div>
            </section>
        </main>
        <AllRecipes/>
        </>
    )
}