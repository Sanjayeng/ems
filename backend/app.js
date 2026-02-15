const express = require('express');
const app = express();

app.use(express.json());

const taskRoutes = require('./modules/tasks/task.routes');
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('OWMS Backend Running');
});

module.exports = app;
