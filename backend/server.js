// server.js
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const groupRoutes = require('./routes/groupRoutes');
const userRoutes = require('./routes/userRoutes');
const groupMembershipRoutes = require('./routes/groupMembershipRoutes');
const authRoutes = require('./routes/authRoutes')
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swaggerConfig');

const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware, configurations, and other routes...


// Middleware
// app.use(express.json());

app.use(cors());

app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Routes

app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
 
app.use('/api', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/users', userRoutes);
app.use('/api/group-memberships', groupMembershipRoutes);

// Start the server

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
