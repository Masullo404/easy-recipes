-- CreateTable
CREATE TABLE "tags" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeTags" (
    "tagId" INTEGER NOT NULL,
    "RecipeId" INTEGER NOT NULL,

    CONSTRAINT "RecipeTags_pkey" PRIMARY KEY ("tagId","RecipeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- AddForeignKey
ALTER TABLE "RecipeTags" ADD CONSTRAINT "RecipeTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeTags" ADD CONSTRAINT "RecipeTags_RecipeId_fkey" FOREIGN KEY ("RecipeId") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
