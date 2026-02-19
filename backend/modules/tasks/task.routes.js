console.log("Task routes loaded");

const express = require('express');
const router = express.Router();
const taskController = require('./task.controller');

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.patch('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.get('/:id/versions', taskController.getTaskVersions);
router.patch('/:id/assign', taskController.assignTask);

module.exports = router;
