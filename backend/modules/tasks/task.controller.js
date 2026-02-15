const taskService = require('./task.service');

exports.createTask = async (req, res) => {
  const task = await taskService.createTask(req.body);
  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await taskService.getTasks();
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const task = await taskService.updateTask(req.params.id, req.body);
  res.json(task);
};
