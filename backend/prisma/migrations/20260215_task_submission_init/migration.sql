-- Migration: create tasks, task_versions, submissions tables
-- Generated snapshot for local development. Run `npx prisma migrate deploy` or
-- `npx prisma migrate dev --name init` against a real Postgres DB to apply.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "Task" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" text NOT NULL,
  "description" text NOT NULL,
  "departmentId" text NOT NULL,
  "assignedToId" text NOT NULL,
  "assignedById" text NOT NULL,
  "dueDate" timestamptz,
  "priority" text NOT NULL,
  "status" text NOT NULL DEFAULT 'pending',
  "versionNo" integer NOT NULL DEFAULT 1,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "TaskVersion" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "taskId" uuid NOT NULL,
  "versionNo" integer NOT NULL,
  "title" text NOT NULL,
  "description" text NOT NULL,
  "dueDate" timestamptz,
  "changedById" text NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT fk_taskversion_task FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_taskversion_taskId ON "TaskVersion" ("taskId");

CREATE TABLE IF NOT EXISTS "Submission" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "taskId" uuid NOT NULL,
  "submittedById" text NOT NULL,
  "versionNo" integer NOT NULL,
  "fileUrl" text,
  "externalLink" text,
  "comment" text,
  "status" text NOT NULL DEFAULT 'pending',
  "reviewedById" text,
  "reviewComment" text,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT fk_submission_task FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_submission_taskId ON "Submission" ("taskId");
