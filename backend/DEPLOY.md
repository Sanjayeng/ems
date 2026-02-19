Deployment checklist (Vercel)
-----------------------------

1. Environment variables (Vercel Project > Settings > Environment Variables):
   - `DATABASE_URL` (postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public)
   - If using S3 for file uploads:
     - `AWS_S3_BUCKET`
     - `AWS_REGION`
     - `AWS_ACCESS_KEY_ID`
     - `AWS_SECRET_ACCESS_KEY`

2. Prisma
   - Build step should run `npx prisma generate`.
   - Run migrations against your Postgres DB outside Vercel (CI or local):
     - `npx prisma migrate deploy` (for production)

3. File uploads
   - Vercel functions have ephemeral storage. Use S3/GCS for production uploads.
   - `config/multer.js` will use S3 when AWS env vars are present and `aws-sdk` + `multer-s3` are installed.

4. Build & Deploy
   - Ensure `vercel.json` routes `/(.*)` -> `server.js` (already present).
   - Deploy via Vercel UI or CLI.

5. Post-deploy checks
   - Verify `GET /api/tasks` returns data.
   - Test submission with external link and file upload (should store to S3).

6. Troubleshooting
   - If the server exits immediately, check Vercel function logs for missing env vars or migration errors.
   - For DB issues, ensure `DATABASE_URL` is reachable from Vercel.
