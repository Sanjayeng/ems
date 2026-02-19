const prisma = require('../../config/prisma');

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

exports.createSubmission = async ({ taskId, submittedById, externalLink, comment, file }) => {
  console.log('[createSubmission] Starting with:', { taskId, submittedById });
  
  const task = await prisma.task.findUnique({ where: { id: taskId } });
  console.log('[createSubmission] Task found:', task ? `${task.id} - ${task.title}` : 'NOT FOUND');
  if (!task) throw new Error('Task not found');

  if (externalLink && !isValidUrl(externalLink)) {
    console.log('[createSubmission] Invalid URL');
    throw new Error('Invalid external link');
  }

  const fileUrl = file && file.filename ? `/uploads/${file.filename}` : null;
  console.log('[createSubmission] File URL:', fileUrl);

  const submission = await prisma.submission.create({
    data: {
      taskId,
      submittedById,
      versionNo: task.versionNo,
      fileUrl,
      externalLink,
      comment
    },
    include: {
      submittedBy: true,
      task: true
    }
  });

  console.log('[createSubmission] Submission created:', { id: submission.id, taskId: submission.taskId });
  return submission;
};

exports.getByTask = async (taskId) => {
  try {
    const submissions = await prisma.submission.findMany({
      where: { taskId },
      include: {
        submittedBy: true,
        reviewedBy: true,
        task: true
      },
      orderBy: { createdAt: 'desc' }
    });
    return submissions || [];
  } catch (error) {
    console.error(`Error fetching submissions for task ${taskId}:`, error);
    throw new Error(`Failed to fetch submissions for task ${taskId}`);
  }
};

exports.getSubmissionHistory = async (taskId, submittedById) => {
  return prisma.submission.findMany({
    where: {
      taskId,
      submittedById
    },
    include: {
      submittedBy: true,
      reviewedBy: true,
      task: true
    },
    orderBy: { createdAt: 'desc' }
  });
};

exports.getSubmissionById = async (id) => {
  const submission = await prisma.submission.findUnique({
    where: { id },
    include: {
      submittedBy: true,
      reviewedBy: true,
      task: {
        include: {
          assignedTo: true,
          assignedBy: true
        }
      }
    }
  });

  if (!submission) {
    throw new Error('Submission not found');
  }

  return submission;
};

exports.reviewSubmission = async (id, { reviewerId, status, reviewComment }) => {
  console.log('[reviewSubmission] Starting with:', { id, reviewerId, status });
  
  const valid = ['approved', 'rejected', 'pending'];
  if (!valid.includes(status)) {
    console.log('[reviewSubmission] Invalid status:', status);
    throw new Error(`Invalid status: ${status}. Must be one of: ${valid.join(', ')}`);
  }

  const submission = await prisma.submission.findUnique({
    where: { id }
  });

  if (!submission) {
    console.log('[reviewSubmission] Submission not found:', id);
    throw new Error('Submission not found');
  }

  console.log('[reviewSubmission] Updating submission:', { id, oldStatus: submission.status, newStatus: status });

  const updated = await prisma.submission.update({
    where: { id },
    data: {
      reviewedById: reviewerId,
      status,
      reviewComment: reviewComment || null,
      updatedAt: new Date()
    },
    include: {
      submittedBy: true,
      reviewedBy: true,
      task: true
    }
  });

  console.log('[reviewSubmission] Successfully updated submission:', updated?.id);
  return updated;
};

exports.deleteSubmission = async (id) => {
  const submission = await prisma.submission.findUnique({
    where: { id }
  });

  if (!submission) {
    throw new Error('Submission not found');
  }

  return prisma.submission.delete({
    where: { id }
  });
};
