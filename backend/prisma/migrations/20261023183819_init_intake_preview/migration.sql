-- CreateTable
CREATE TABLE "intake_previews" (
    "id" TEXT NOT NULL,
    "procedure" VARCHAR(120) NOT NULL,
    "country" VARCHAR(80) NOT NULL,
    "timeline" VARCHAR(80) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "intake_previews_pkey" PRIMARY KEY ("id")
);
