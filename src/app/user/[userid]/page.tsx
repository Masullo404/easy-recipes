import Image from "next/image"
import { recipe, user } from "@prisma/client"
import Link from "next/link"
import { Button } from "react-bootstrap"
import style from "../../../styles/user-page/style.module.css"

export default async function UserPage({params}:{params:{userid:string}}){
    const userId = Number(params.userid)
    const url = process.env.NEXTAUTH_URL
    const userRecipeResponse = await fetch(url+"/api/User/userById",{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({userId:Number(userId)})
    })
    const otherResponse = await fetch(url+"/api/User/userById/userRecipes",{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({userId:Number(userId)})
    })
    if(!userRecipeResponse.ok){
        return(
            <div style={{height:"80vh"}} className="d-flex justify-content-center align-items-center">
                <div className="alert alert-danger">
                    An error ocurred when loading user data.
                </div>
            </div>
        )
    }
    const {user,recipe}:{user:user,recipe:recipe} =  await userRecipeResponse.json()
    const otherRecipes:recipe[] = (await otherResponse.json()).slice(0,4)

    return(
        <main className="bg-light">
            <section className={"d-flex p-5 gap-5 "+style.main}>
                
                <div className=" bg-white rounded shadow-sm">
                    {user && <Image src={String(user?.img)} alt={'user profile image'} height={500} width={500} 
                    className="w-100 rounded img-fluid"/>}
                    <p className="h2 text-center pb-3">{user?.name}</p>
                </div>
                
                <div className="d-flex flex-column justify-content-between gap-5 bg-white rounded shadow-sm p-4">
                    <div>
                        <p className="h4">Bio</p>
                        <p>{user?.bio}</p>
                        <hr />
                    </div>

                    <div className=" d-flex justify-content-between ">
                    {  
                    <div className="d-flex  w-100">
                        <Image src={recipe.imgUrl} width={500} height={500} alt="recipe image" className="w-50 img-fluid"  />
                        <div className="w-50 d-flex flex-column align-items-center justify-content-center">
                            <p>Most Liked Recipe:{recipe.name}</p>
                            <Link href={`/recipes/recipe/${recipe.id}`}><Button>See more</Button></Link>
                        </div>
                    </div>
                    }
                    </div>
                </div>
            </section>
            <section className="d-flex gap-5 p-5 flex-wrap justify-content-center">
                    { 
                    (otherRecipes)?
                    (
                        otherRecipes.filter(recipes => recipes.id !== recipe?.id ).map(recipe => (
                            <div className={"w-25 bg-white rounded shadow-sm "+style.recipes} key={recipe.id}>
                                 <Image src={recipe.imgUrl} alt="recipe image" height={500} width={500} className="w-100 img-fluid"/> 
                                <div className="p-4 ">
                                    <p className="h3">{recipe.name}</p>
                                    <Link href={`/recipes/recipe/${recipe.id}`}><Button>See more</Button></Link>
                                </div>
                            </div>
                        ))
                    )
                    :
                    (
                        <div className="alert alert-secondary">
                            this user does not have more recipes
                        </div>
                    )
                    }
            </section>
        </main>
    )
}