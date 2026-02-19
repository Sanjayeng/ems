const app = require("./app");

const PORT = process.env.PORT || 5000;

// Start server only when run directly (local dev / container).
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export app for serverless platforms (Vercel) and tests
module.exports = app;
