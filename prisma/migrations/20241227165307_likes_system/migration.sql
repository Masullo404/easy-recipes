-- CreateTable
CREATE TABLE "like" (
    "recipeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "like" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "like_pkey" PRIMARY KEY ("recipeId","userId")
);

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
