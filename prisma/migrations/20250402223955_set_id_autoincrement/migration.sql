-- AlterTable
CREATE SEQUENCE sets_id_seq;
ALTER TABLE "sets" ALTER COLUMN "id" SET DEFAULT nextval('sets_id_seq');
ALTER SEQUENCE sets_id_seq OWNED BY "sets"."id";
