// File structure:
// - app.js (main application)
// - routes/tasks.js (task routes)
// - package.json (dependencies)

// app.js
const express = require('express');
const bodyParser = require('body-parser');
const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/api/tasks', tasksRouter);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Task Manager API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export for testing