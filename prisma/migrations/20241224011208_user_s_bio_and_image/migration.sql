-- AlterTable
ALTER TABLE "user" ADD COLUMN     "bio" TEXT NOT NULL DEFAULT 'My bio',
ADD COLUMN     "img" TEXT NOT NULL DEFAULT 'http://localhost:3000/_next/static/media/profile-picture.deecdcf8.png';
