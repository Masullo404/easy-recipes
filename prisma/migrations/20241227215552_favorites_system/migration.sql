-- CreateTable
CREATE TABLE "favorites" (
    "recipeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "liked" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("recipeId","userId")
);

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
