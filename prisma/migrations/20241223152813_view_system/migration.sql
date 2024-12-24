-- CreateTable
CREATE TABLE "userView" (
    "rcipeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "view" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "userView_pkey" PRIMARY KEY ("rcipeId","userId")
);

-- AddForeignKey
ALTER TABLE "userView" ADD CONSTRAINT "userView_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userView" ADD CONSTRAINT "userView_rcipeId_fkey" FOREIGN KEY ("rcipeId") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
