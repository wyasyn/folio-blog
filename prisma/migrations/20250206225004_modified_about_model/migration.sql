/*
  Warnings:

  - You are about to drop the column `aboutId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `abouts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `abouts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_aboutId_fkey";

-- AlterTable
ALTER TABLE "abouts" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "aboutId";

-- CreateIndex
CREATE UNIQUE INDEX "abouts_userId_key" ON "abouts"("userId");

-- AddForeignKey
ALTER TABLE "abouts" ADD CONSTRAINT "abouts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
