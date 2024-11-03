/*
  Warnings:

  - You are about to drop the column `ImageURL` on the `Tweet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "ImageURL",
ADD COLUMN     "imageURL" TEXT;
