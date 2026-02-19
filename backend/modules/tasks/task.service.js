const prisma = require('../../config/prisma');

// CREATE TASK
exports.createTask = async (data) => {
  // Validate required fields
  if (!data.title) throw new Error('Title is required');
  if (!data.description) throw new Error('Description is required');
  if (!data.departmentId) throw new Error('Department ID is required');
  if (!data.assignedToId) throw new Error('Assigned To ID is required');
  if (!data.assignedById) throw new Error('Assigned By ID is required');
  if (!data.priority) throw new Error('Priority is required');
  if (!data.dueDate) throw new Error('Due date is required');

  const safeData = {
    title: data.title,
    description: data.description,
    departmentId: data.departmentId,
    assignedToId: data.assignedToId,
    assignedById: data.assignedById,
    priority: data.priority
  };

  // Validate and parse dueDate
  const d = new Date(data.dueDate);
  if (isNaN(d)) throw new Error('Invalid dueDate');
  safeData.dueDate = d;

  return prisma.task.create({ data: safeData });
};

// GET TASKS
exports.getTasks = async () => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        submissions: true
      }
    });
    return tasks || [];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Failed to fetch tasks');
  }
};

// GET TASK BY ID
exports.getTaskById = async (id) => {
  const task = await prisma.task.findUnique({
    where: { id },
    include: {
      submissions: true,
      versions: true,
      assignedTo: true,
      assignedBy: true,
      department: true
    }
  });

  if (!task) {
    throw new Error('Task not found');
  }

  return task;
};

// UPDATE TASK WITH VERSION TRACKING
exports.updateTask = async (id, data) => {

  const existingTask = await prisma.task.findUnique({
    where: { id }
  });

  if (!existingTask) {
    throw new Error("Task not found");
  }

  // Save old version
  await prisma.taskVersion.create({
    data: {
      taskId: existingTask.id,
      versionNo: existingTask.versionNo,
      title: existingTask.title,
      description: existingTask.description,
      dueDate: existingTask.dueDate,
      changedById: data.changedById || "system"
    }
  });

  // Prepare safe update object
  const updateData = {
    versionNo: existingTask.versionNo + 1
  };

  if (data.title !== undefined) {
    updateData.title = data.title;
  }

  if (data.description !== undefined) {
    updateData.description = data.description;
  }

  if (data.dueDate !== undefined) {
    const d = new Date(data.dueDate);
    if (isNaN(d)) throw new Error('Invalid dueDate');
    updateData.dueDate = d;
  }

  if (data.priority !== undefined) {
    updateData.priority = data.priority;
  }

  if (data.status !== undefined) {
    updateData.status = data.status;
  }

  return prisma.task.update({
    where: { id },
    data: updateData
  });
};

// GET TASK VERSIONS
exports.getTaskVersions = async (taskId) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId }
  });

  if (!task) {
    throw new Error('Task not found');
  }

  return prisma.taskVersion.findMany({
    where: { taskId },
    include: {
      changedBy: true
    },
    orderBy: { createdAt: 'desc' }
  });
};

// DELETE TASK
exports.deleteTask = async (id) => {
  const task = await prisma.task.findUnique({
    where: { id }
  });

  if (!task) {
    throw new Error('Task not found');
  }

  return prisma.task.delete({
    where: { id }
  });
};

// ASSIGN TASK (Only Team Lead can assign)
exports.assignTask = async (taskId, assignedToId, assignedById, userRole) => {
  // Only Team Lead (TL) can assign tasks
  if (userRole !== 'Team Lead' && userRole !== 'tl' && userRole !== 'admin') {
    throw new Error('Only Team Lead can assign tasks');
  }

  const task = await prisma.task.findUnique({
    where: { id: taskId }
  });

  if (!task) {
    throw new Error('Task not found');
  }

  // Save old version
  await prisma.taskVersion.create({
    data: {
      taskId: task.id,
      versionNo: task.versionNo,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      changedById: assignedById
    }
  });

  return prisma.task.update({
    where: { id: taskId },
    data: {
      assignedToId,
      versionNo: task.versionNo + 1
    },
    include: {
      assignedTo: true,
      assignedBy: true
    }
  });
};
