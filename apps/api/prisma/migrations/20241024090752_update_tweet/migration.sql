/*
  Warnings:

  - You are about to drop the column `ImageURk` on the `Tweet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "ImageURk",
ADD COLUMN     "ImageURL" TEXT;
