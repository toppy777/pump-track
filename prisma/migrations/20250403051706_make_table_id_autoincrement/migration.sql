-- AlterTable
CREATE SEQUENCE exercise_groups_id_seq;
ALTER TABLE "exercise_groups" ALTER COLUMN "id" SET DEFAULT nextval('exercise_groups_id_seq');
ALTER SEQUENCE exercise_groups_id_seq OWNED BY "exercise_groups"."id";

-- AlterTable
CREATE SEQUENCE exercises_id_seq;
ALTER TABLE "exercises" ALTER COLUMN "id" SET DEFAULT nextval('exercises_id_seq');
ALTER SEQUENCE exercises_id_seq OWNED BY "exercises"."id";

-- AlterTable
CREATE SEQUENCE trainings_id_seq;
ALTER TABLE "trainings" ALTER COLUMN "id" SET DEFAULT nextval('trainings_id_seq');
ALTER SEQUENCE trainings_id_seq OWNED BY "trainings"."id";
