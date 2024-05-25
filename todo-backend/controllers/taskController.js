const { tasks, Task } = require('../models/Task');

exports.getTasks = (req, res) => {
  res.json(tasks);
};

exports.getTask = (req, res) => {
  const task = tasks.find(task => task.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ msg: 'Task not found' });
  res.json(task);
};

exports.createTask = (req, res) => {
  const { title, description, category, dueDate } = req.body;
  const newTask = new Task(title, description, category, dueDate);
  tasks.push(newTask);
  res.json(newTask);
};

exports.updateTask = (req, res) => {
  const task = tasks.find(task => task.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ msg: 'Task not found' });

  const { title, description, category, dueDate } = req.body;
  task.title = title || task.title;
  task.description = description || task.description;
  task.category = category || task.category;
  task.dueDate = dueDate || task.dueDate;

  res.json(task);
};

exports.deleteTask = (req, res) => {
  const index = tasks.findIndex(task => task.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ msg: 'Task not found' });

  tasks.splice(index, 1);
  res.json({ msg: 'Task deleted' });
};
