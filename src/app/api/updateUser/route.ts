import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import prisma from "@/database/db";

export async function POST(req: NextRequest) {
    try {
        const body = await req.formData();
        const session = await getServerSession(options);

        const user = await prisma.user.findUnique({
            where: {
                email: String(session?.user?.email),
            },
        });

        if (!user) throw new Error("User not found");

        const file = body.get("img") as Blob;
        const bio = body.get("bio");

        if (!file && !bio) throw new Error("Nothing was selected");

        if (bio) {
            await prisma.user.update({
                where: { email: user.email },
                data: { bio: String(bio) },
            });
        }

        if (file) {
            if (!(file instanceof Blob)) {
                throw new Error("Invalid archive selected");
            }

            if (!file.type.startsWith("image/")) {
                throw new Error("Invalid file type. Only images are allowed.");
            }

            const fileToBase64 = async (file: Blob): Promise<string> => {
                const buffer = Buffer.from(await file.arrayBuffer());
                return buffer.toString("base64");
            };

            const fileBase64 = await fileToBase64(file);

            await prisma.user.update({
                where: { email: user.email },
                data: { img: `data:image/png;base64,${fileBase64}` },
            });
        }

        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/profile`);
    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json({error:err}, { status: 400 });
    }
}
