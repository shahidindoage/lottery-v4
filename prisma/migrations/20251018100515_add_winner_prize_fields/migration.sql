-- CreateTable
CREATE TABLE "LotterySubmission" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "accepted_terms" BOOLEAN NOT NULL,
    "accepted_privacy" BOOLEAN NOT NULL,
    "winner" INTEGER NOT NULL DEFAULT 0,
    "prize" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LotterySubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LotterySubmission_uniqueId_key" ON "LotterySubmission"("uniqueId");
