const express = require("express");
const app = express();

app.use(express.json());

const taskRoutes = require("./modules/tasks/task.routes");
app.use("/tasks", taskRoutes);

console.log("Task routes loaded");

module.exports = app;
