import MostViewedRecipes from "@/components/recipes/most-viewed-recipes";
import SearchRecipes from "@/components/recipes/recipes-search";
import RecipesPageCarousel from "@/components/recipes/recipes-page-carousel";

export default function Recipes(){
    
    return (
        <main className="bg-light">
           <RecipesPageCarousel />
            <section className="pl-5 pr-5">
                    <h1 className="text-center mt-5">See the most viewed Recipes</h1>
                    <div className="d-flex justify-content-center">
                        <hr className="text-center w-75"/>
                    </div>
                    <div className="d-flex flex-wrap p-5 gap-5 h-100">
                       <MostViewedRecipes />
                    </div>
                    <hr />
            </section>
            <div>
                <h1 className="text-center mt-5">Search Recipes</h1>
            </div>
            <SearchRecipes />
        </main>
    )
}