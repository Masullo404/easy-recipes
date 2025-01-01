import prisma from "@/database/db"
import { getServerSession } from "next-auth"
import { options } from "../auth/[...nextauth]/options"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(options); 
        const recipeData = await req.formData();
        const file = recipeData.get('image') as Blob;

        if (!file) throw new Error('No file uploaded');

        const fileToBase64 = async (file: Blob): Promise<string> => {
            const buffer = Buffer.from(await file.arrayBuffer());
            return buffer.toString('base64');
        };

        const fileBase64 = await fileToBase64(file);

        const userId = await prisma.user.findUnique({
            where: {
                email: String(session?.user?.email),
            },
        });

        if (!userId) throw new Error('User not found');

        
        const recipe = await prisma.recipe.create({
            data: {
                name: String(recipeData.get('recipe name')),
                userId: Number(userId?.id),
                description: String(recipeData.get('description')),
                imgUrl: `data:image/png;base64,${fileBase64}`, 
            },
        });
        
        const allTags = await prisma.tags.findMany()
        allTags.forEach(tag => {
            if(recipeData.get(tag.name) === null){
                const notSelectedTag = allTags.filter(notSelectedTag => notSelectedTag===tag)[0]
                if(!notSelectedTag) return
                allTags.splice(allTags.indexOf(notSelectedTag),1)
                return
            }
        })

        allTags.forEach(async (tag) => {
            await prisma.recipeTags.create({
                data:{
                    linked:true,
                    RecipeId:recipe.id,
                    tagId:tag.id
                }
            })
        })
        
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/my_recipes`);
    } catch (err) {
        console.log('See the error: ' + err);
        return new Response('Something went wrong', { status: 500 });
    }
}