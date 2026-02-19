const express = require('express');
const router = express.Router();
const submissionsController = require('./submissions.controller');
const upload = require('../../config/multer');

// Middleware to handle multer errors
const handleMulterError = (err, req, res, next) => {
  if (err) {
    console.error('[multer error]', err.message);
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  }
  next();
};

router.post('/', (req, res, next) => {
  console.log('[POST /] Incoming submission request');
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.error('[multer] Error:', err.message);
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    }
    console.log('[multer] File processed, calling controller');
    submissionsController.create(req, res);
  });
});

router.get('/task/:taskId', submissionsController.getByTask);
router.get('/:id', submissionsController.getSubmissionById);
router.get('/task/:taskId/user/:submittedById', submissionsController.getSubmissionHistory);
router.patch('/:id/review', submissionsController.review);
router.delete('/:id', submissionsController.deleteSubmission);

module.exports = router;
