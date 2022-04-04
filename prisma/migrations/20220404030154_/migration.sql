/*
  Warnings:

  - You are about to drop the column `album` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Song` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Song" DROP COLUMN "album",
DROP COLUMN "year";
