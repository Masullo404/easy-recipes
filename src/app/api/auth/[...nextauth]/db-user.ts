import prisma from "../../../../database/db"

async function GetUser(email:string,password:string){
    const user = await prisma.user.findUnique({
        where:{
            email:email,
            password:password
        }
    })
    if (!user) return null
    return {
        email:user.email,
        password:user.password,
        id:user.id,
        name:user.name
    }
}
export default GetUser