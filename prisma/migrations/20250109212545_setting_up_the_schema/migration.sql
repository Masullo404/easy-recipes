-- DropForeignKey
ALTER TABLE "RecipeTags" DROP CONSTRAINT "RecipeTags_RecipeId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeTags" DROP CONSTRAINT "RecipeTags_tagId_fkey";

-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_userId_fkey";

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_userId_fkey";

-- DropForeignKey
ALTER TABLE "userView" DROP CONSTRAINT "userView_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "userView" DROP CONSTRAINT "userView_userId_fkey";

-- AddForeignKey
ALTER TABLE "userView" ADD CONSTRAINT "userView_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userView" ADD CONSTRAINT "userView_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeTags" ADD CONSTRAINT "RecipeTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeTags" ADD CONSTRAINT "RecipeTags_RecipeId_fkey" FOREIGN KEY ("RecipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
