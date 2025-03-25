-- AlterTable
ALTER TABLE "body_areas" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "body_areas_id_seq";

-- AlterTable
ALTER TABLE "exercise_groups" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "exercise_groups_id_seq";

-- AlterTable
ALTER TABLE "exercises" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "exercises_id_seq";

-- AlterTable
ALTER TABLE "muscles" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "muscles_id_seq";
