const prisma = require('../../config/prisma');

exports.createTask = async (data) => {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      departmentId: data.departmentId,
      assignedToId: data.assignedToId,
      assignedById: data.assignedById,
      dueDate: new Date(data.dueDate),
      priority: data.priority
    }
  });
};

exports.getTasks = async () => {
  return prisma.task.findMany({
    include: {
      submissions: true
    }
  });
};

exports.updateTask = async (id, data) => {

  const existingTask = await prisma.task.findUnique({
    where: { id }
  });

  // Save version
  await prisma.taskVersion.create({
    data: {
      taskId: id,
      versionNo: existingTask.versionNo,
      title: existingTask.title,
      description: existingTask.description,
      dueDate: existingTask.dueDate,
      changedById: data.changedById
    }
  });

  return prisma.task.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      dueDate: new Date(data.dueDate),
      versionNo: existingTask.versionNo + 1
    }
  });
};
