
// routes/joinNotificationRoutes.js
const express = require('express');
const router = express.Router();
const joinNotificationController = require('../controllers/joinNotificationController');
const { authJwt } = require("../middleware");

// Route to get all join notifications
router.get('/',[authJwt.verifyToken], joinNotificationController.getAllJoinNotifications);

// Route to get a join notification by ID
router.get('/:id',[authJwt.verifyToken], joinNotificationController.getJoinNotificationById);

// Route to create a join notification
router.post('/',[authJwt.verifyToken], joinNotificationController.createJoinNotification);

// Route to delete a join notification
router.delete('/:id',[authJwt.verifyToken], joinNotificationController.deleteJoinNotification);

module.exports = router