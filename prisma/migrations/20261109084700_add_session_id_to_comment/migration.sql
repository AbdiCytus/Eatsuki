-- Add sessionId column with a temporary default for existing rows,
-- then drop the default so new rows must supply it explicitly.
ALTER TABLE "Comment" ADD COLUMN "sessionId" TEXT NOT NULL DEFAULT 'legacy-session';
ALTER TABLE "Comment" ALTER COLUMN "sessionId" DROP DEFAULT;
