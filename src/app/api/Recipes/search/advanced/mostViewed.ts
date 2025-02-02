import prisma from "@/database/db"
import { recipe } from "@prisma/client"

export default async function PopularRecipes(recipes:recipe[]) {
    try{
        const views = await prisma.userView.findMany()
        if(!views) return null
        const countingViews:{recipeId:number,counter:number}[] = []

        views.forEach(view => {
            if(countingViews.filter(item => item.recipeId === view.recipeId)[0]){
                countingViews.filter(item => item.recipeId === view.recipeId)[0].counter += 1
                return
            }
            countingViews.push({recipeId:view.recipeId,counter:1})
            return
        })    
        const popular = countingViews.sort((a,b)=> a.counter - b.counter)
        const result:recipe[] = []
        recipes.forEach(recipe => {
            popular.forEach(popularRecipe => {
                if(popularRecipe.recipeId === recipe.id) result.push(recipe)
            })
        })
        return result
    }catch(err){
        console.log(err)
        return null
    }
}