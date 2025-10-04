-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('user', 'moderator', 'admin');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "username" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manga" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "genre" TEXT,
    "status" TEXT,
    "description" TEXT,
    "coverImagePath" TEXT,
    "externalId" TEXT,
    "sourceApi" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "manga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_manga_lists" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mangaId" TEXT NOT NULL,
    "listType" TEXT NOT NULL,
    "rating" SMALLINT,
    "review" TEXT,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_manga_lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_favorites" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mangaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_reviews" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mangaId" TEXT NOT NULL,
    "rating" SMALLINT NOT NULL,
    "review" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE INDEX "manga_title_idx" ON "manga"("title");

-- CreateIndex
CREATE INDEX "manga_author_idx" ON "manga"("author");

-- CreateIndex
CREATE INDEX "manga_genre_idx" ON "manga"("genre");

-- CreateIndex
CREATE INDEX "manga_status_idx" ON "manga"("status");

-- CreateIndex
CREATE UNIQUE INDEX "user_manga_lists_userId_mangaId_listType_key" ON "user_manga_lists"("userId", "mangaId", "listType");

-- CreateIndex
CREATE INDEX "user_manga_lists_userId_idx" ON "user_manga_lists"("userId");

-- CreateIndex
CREATE INDEX "user_manga_lists_mangaId_idx" ON "user_manga_lists"("mangaId");

-- CreateIndex
CREATE UNIQUE INDEX "user_favorites_userId_mangaId_key" ON "user_favorites"("userId", "mangaId");

-- CreateIndex
CREATE INDEX "user_favorites_userId_idx" ON "user_favorites"("userId");

-- CreateIndex
CREATE INDEX "user_favorites_mangaId_idx" ON "user_favorites"("mangaId");

-- CreateIndex
CREATE UNIQUE INDEX "user_reviews_userId_mangaId_key" ON "user_reviews"("userId", "mangaId");

-- CreateIndex
CREATE INDEX "user_reviews_userId_idx" ON "user_reviews"("userId");

-- CreateIndex
CREATE INDEX "user_reviews_mangaId_idx" ON "user_reviews"("mangaId");

-- AddForeignKey
ALTER TABLE "user_manga_lists" ADD CONSTRAINT "user_manga_lists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_manga_lists" ADD CONSTRAINT "user_manga_lists_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "manga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorites" ADD CONSTRAINT "user_favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorites" ADD CONSTRAINT "user_favorites_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "manga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_reviews" ADD CONSTRAINT "user_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_reviews" ADD CONSTRAINT "user_reviews_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "manga"("id") ON DELETE CASCADE ON UPDATE CASCADE;
