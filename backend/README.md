# OWMS Backend — Quick Demo & Run Guide

Status: ~90% complete. Core Task & Submission APIs implemented, Prisma schema + migration snapshot added, file-upload plumbing with S3 fallback, basic tests scaffolded.

Quick demo (local)
1. Copy env and set DB:
   ```bash
   cd backend
   cp .env.example .env
   # edit .env -> set DATABASE_URL to your Postgres
   ```
2. Install deps:
   ```bash
   npm install
   # if any package fails, try pinning versions or install specific package, e.g.:
   # npm install multer@1.4.4
   ```
3. (Optional) Apply migrations and generate Prisma client:
   ```bash
   npx prisma migrate dev --name init   # dev
   npx prisma generate
   ```
4. Start server:
   ```bash
   npm start        # or `npm run dev` for nodemon
   ```
5. Verify endpoints in browser or curl:
   - GET tasks: `http://localhost:5000/api/tasks`
   - Create task (curl):
     ```bash
     curl -X POST http://localhost:5000/api/tasks \
       -H "Content-Type: application/json" \
       -d '{"title":"Task A","description":"desc","departmentId":"tech","assignedToId":"intern1","assignedById":"tl1","dueDate":"2026-02-20","priority":"high"}'
     ```
   - Create submission (no file): POST `/api/submissions` with JSON { taskId, submittedById, externalLink }

What to show HR
- Open `http://localhost:5000/api/tasks` — returns JSON list (already working).
- Create a task and show the POST response.
- Create a submission (external link) and show GET `/api/submissions/task/<TASK_ID>`.

Deployment notes (Vercel)
- Set env vars in Vercel: `DATABASE_URL`. For S3 uploads set `AWS_S3_BUCKET`, `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`.
- `config/multer.js` auto-uses S3 when AWS envs are present (requires `aws-sdk` and `multer-s3` installed).
- Run migrations against your production DB (`npx prisma migrate deploy`) before deploying or as CI step.

Files of interest
- `prisma/schema.prisma` — data models
- `prisma/migrations/*/migration.sql` — SQL snapshot
- `modules/tasks/*` and `modules/submissions/*` — routes/controllers/services
- `config/multer.js` — upload handling (S3 + disk + fallback)
- `server.js` / `app.js` — app bootstrap and routes

Next steps to finish (remaining ~10%):
- Ensure CI/Dev can `npm install` (fix any registry/pinning issues) and run `npm test`.
- Apply migrations to target DB and run `npx prisma generate`.
- Configure S3 and verify uploads in production (Vercel).

If you want, I can prepare a short slide or screenshot pack for the demo.
