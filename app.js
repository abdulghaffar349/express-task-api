// app.js
const express = require('express');
const bodyParser = require('body-parser');
const tasksRouter = require('./routes/tasks');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/api/tasks', tasksRouter);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Task Manager API' });
});

// Only start the server if this file is run directly
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app; // Export the app, not the server