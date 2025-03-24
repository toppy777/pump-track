/*
  Warnings:

  - You are about to drop the column `muscle_id` on the `exercises` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "muscle_id",
ALTER COLUMN "description" DROP NOT NULL;
