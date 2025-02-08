/*
  Warnings:

  - You are about to drop the column `aboutId` on the `TechStack` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `abouts` table. All the data in the column will be lost.
  - You are about to drop the column `aboutId` on the `certifications` table. All the data in the column will be lost.
  - You are about to drop the column `aboutId` on the `educations` table. All the data in the column will be lost.
  - You are about to drop the column `aboutId` on the `experiences` table. All the data in the column will be lost.
  - You are about to drop the column `aboutId` on the `hobbies` table. All the data in the column will be lost.
  - You are about to drop the column `aboutId` on the `languages` table. All the data in the column will be lost.
  - You are about to drop the column `aboutId` on the `social_links` table. All the data in the column will be lost.
  - You are about to drop the column `aboutId` on the `testimonials` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `abouts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `about_id` to the `TechStack` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `abouts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `about_id` to the `certifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `about_id` to the `educations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `about_id` to the `experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `about_id` to the `hobbies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `about_id` to the `languages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `about_id` to the `social_links` table without a default value. This is not possible if the table is not empty.
  - Added the required column `about_id` to the `testimonials` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TechStack" DROP CONSTRAINT "TechStack_aboutId_fkey";

-- DropForeignKey
ALTER TABLE "abouts" DROP CONSTRAINT "abouts_userId_fkey";

-- DropForeignKey
ALTER TABLE "certifications" DROP CONSTRAINT "certifications_aboutId_fkey";

-- DropForeignKey
ALTER TABLE "educations" DROP CONSTRAINT "educations_aboutId_fkey";

-- DropForeignKey
ALTER TABLE "experiences" DROP CONSTRAINT "experiences_aboutId_fkey";

-- DropForeignKey
ALTER TABLE "hobbies" DROP CONSTRAINT "hobbies_aboutId_fkey";

-- DropForeignKey
ALTER TABLE "languages" DROP CONSTRAINT "languages_aboutId_fkey";

-- DropForeignKey
ALTER TABLE "social_links" DROP CONSTRAINT "social_links_aboutId_fkey";

-- DropForeignKey
ALTER TABLE "testimonials" DROP CONSTRAINT "testimonials_aboutId_fkey";

-- DropIndex
DROP INDEX "abouts_userId_key";

-- AlterTable
ALTER TABLE "TechStack" DROP COLUMN "aboutId",
ADD COLUMN     "about_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "abouts" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "certifications" DROP COLUMN "aboutId",
ADD COLUMN     "about_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "educations" DROP COLUMN "aboutId",
ADD COLUMN     "about_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "experiences" DROP COLUMN "aboutId",
ADD COLUMN     "about_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "hobbies" DROP COLUMN "aboutId",
ADD COLUMN     "about_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "languages" DROP COLUMN "aboutId",
ADD COLUMN     "about_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "social_links" DROP COLUMN "aboutId",
ADD COLUMN     "about_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "testimonials" DROP COLUMN "aboutId",
ADD COLUMN     "about_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "alt_text" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "about_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "abouts_user_id_key" ON "abouts"("user_id");

-- AddForeignKey
ALTER TABLE "abouts" ADD CONSTRAINT "abouts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechStack" ADD CONSTRAINT "TechStack_about_id_fkey" FOREIGN KEY ("about_id") REFERENCES "abouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hobbies" ADD CONSTRAINT "hobbies_about_id_fkey" FOREIGN KEY ("about_id") REFERENCES "abouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "languages" ADD CONSTRAINT "languages_about_id_fkey" FOREIGN KEY ("about_id") REFERENCES "abouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_about_id_fkey" FOREIGN KEY ("about_id") REFERENCES "abouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educations" ADD CONSTRAINT "educations_about_id_fkey" FOREIGN KEY ("about_id") REFERENCES "abouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_links" ADD CONSTRAINT "social_links_about_id_fkey" FOREIGN KEY ("about_id") REFERENCES "abouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certifications" ADD CONSTRAINT "certifications_about_id_fkey" FOREIGN KEY ("about_id") REFERENCES "abouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_about_id_fkey" FOREIGN KEY ("about_id") REFERENCES "abouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_about_id_fkey" FOREIGN KEY ("about_id") REFERENCES "abouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
