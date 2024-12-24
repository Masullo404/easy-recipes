import ImageInput from "@/components/recipes/image-input"
import styles from "../../styles/main.module.css"
import {MyRecentRecipes} from "./myRecentRecipes"
import AllRecipes from "./allRecipes"

export default async function MyRecipes(){
    
    return(
        <>
        <main className={"d-flex justify-content-around p-5 gap-5 "+styles.contrastBG}>
            
            <section className="bg-light flex-grow-1 ml-5 rounded p-5">
                <h2 className="text-center">Create new Recipe</h2>
                <form action={"/api/newRecipe"} method="post" className="ml-5 mr-5 d-flex flex-column align-items-center gap-5" encType="multipart/form-data">
                    <div className="d-flex justify-content-between gap-5 w-75">
                        <div className="d-flex flex-column">
                            <label htmlFor="name" className="h3 ">Recipe Name</label>
                            <input type="text" name="recipe name" placeholder="EX: Sweet Popcorn"/>

                            <label htmlFor="descripion" className="h3 mt-5 mb-3">Describe how to prepare it</label>
                            <textarea name="description" id="description" placeholder="You're going to need..."></textarea>
                        </div>

                        <div className="d-flex flex-column">
                            <ImageInput/>
                        </div>  
                    </div>
                    <button type="submit" className="mb-5 btn btn-success mt-5">Publish</button>
                </form>
            </section>

            <section className="bg-light flex-grow-1 p-5 rounded">
                    <h1>My Recent Recipes</h1>
                    <hr />
                    <div>
                        <MyRecentRecipes />
                    </div>
            </section>
        </main>
        <section className="d-flex flex-wrap p-5 gap-5">
            <AllRecipes />
        </section>
        </>
    )
}