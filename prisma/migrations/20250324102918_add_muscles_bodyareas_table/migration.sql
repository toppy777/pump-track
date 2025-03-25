-- CreateTable
CREATE TABLE "body_areas" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "body_areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "muscles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "body_area_id" INTEGER NOT NULL,

    CONSTRAINT "muscles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "muscles" ADD CONSTRAINT "muscles_body_area_id_fkey" FOREIGN KEY ("body_area_id") REFERENCES "body_areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
