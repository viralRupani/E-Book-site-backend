-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "Enrollment" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "Collage" TEXT NOT NULL,
    "Dgree" TEXT NOT NULL,
    "Sem" INTEGER NOT NULL,
    "Role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "Name" TEXT NOT NULL,
    "FileUrl" TEXT NOT NULL,
    "Catalogue_name" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Catalogue" (
    "id" SERIAL NOT NULL,
    "Catalogue" TEXT NOT NULL,

    CONSTRAINT "Catalogue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Enrollment_key" ON "User"("Enrollment");

-- CreateIndex
CREATE UNIQUE INDEX "Catalogue_Catalogue_key" ON "Catalogue"("Catalogue");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_Catalogue_name_fkey" FOREIGN KEY ("Catalogue_name") REFERENCES "Catalogue"("Catalogue") ON DELETE RESTRICT ON UPDATE CASCADE;
