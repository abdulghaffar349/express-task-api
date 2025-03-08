// routes/tasks.js
const express = require('express');
const router = express.Router();

// In-memory data store
let tasks = [
  { id: 1, title: 'Learn Express', completed: false },
  { id: 2, title: 'Practice CI/CD', completed: false }
];

// GET all tasks
router.get('/', (req, res) => {
  res.json(tasks);
});

// GET task by ID
router.get('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  res.json(task);
});

// CREATE a new task
router.post('/', (req, res) => {
  const { title } = req.body;
  
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  
  const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  const newTask = { id: newId, title, completed: false };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// UPDATE a task
router.put('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, completed } = req.body;
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  const updatedTask = { 
    ...tasks[taskIndex], 
    title: title !== undefined ? title : tasks[taskIndex].title,
    completed: completed !== undefined ? completed : tasks[taskIndex].completed
  };
  
  tasks[taskIndex] = updatedTask;
  res.json(updatedTask);
});

// DELETE a task
router.delete('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

module.exports = router;