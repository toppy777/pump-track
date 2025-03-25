-- AlterTable
ALTER TABLE "sets" ALTER COLUMN "reps" DROP NOT NULL;

-- AlterTable
ALTER TABLE "trainings" ADD COLUMN     "exercise_id" INTEGER;

-- AddForeignKey
ALTER TABLE "trainings" ADD CONSTRAINT "trainings_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE SET NULL ON UPDATE CASCADE;
