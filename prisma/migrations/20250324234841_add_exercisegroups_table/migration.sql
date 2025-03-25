-- CreateTable
CREATE TABLE "exercise_groups" (
    "user_id" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "exercise_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExerciseToExerciseGroup" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ExerciseToExerciseGroup_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ExerciseToExerciseGroup_B_index" ON "_ExerciseToExerciseGroup"("B");

-- AddForeignKey
ALTER TABLE "exercise_groups" ADD CONSTRAINT "exercise_groups_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToExerciseGroup" ADD CONSTRAINT "_ExerciseToExerciseGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToExerciseGroup" ADD CONSTRAINT "_ExerciseToExerciseGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "exercise_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
