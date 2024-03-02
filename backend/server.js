// server.js
const express = require('express');
const { sequelize } = require('./models');
const groupRoutes = require('./routes/groupRoutes');
const userRoutes = require('./routes/userRoutes');

const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware, configurations, and other routes...

// Start the server

// Middleware
// app.use(express.json());

app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Routes
app.use('/api', groupRoutes);
app.use('/api', userRoutes);

// Start server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
