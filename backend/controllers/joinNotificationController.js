// controllers/joinNotificationController.js
const { JoinNotification } = require("../models");

const JoinNotificationController = {
  getAllJoinNotifications: async (req, res) => {
    try {
      const joinNotifications = await JoinNotification.findAll();
      res.json(joinNotifications);
    } catch (error) {
      console.error("Error fetching join notifications:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getJoinNotificationById: async (req, res) => {
    const { id } = req.params;
    try {
      const joinNotification = await JoinNotification.findByPk(id);
      if (!joinNotification) {
        return res.status(404).json({ error: "Join notification not found" });
      }
      res.json(joinNotification);
    } catch (error) {
      console.error("Error fetching join notification:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Create a new join notification
  createJoinNotification: async (req, res) => {
    const { userId, groupId } = req.body;

    try {
      const joinNotification = await JoinNotification.create({
        userId: parseInt(userId),
        groupId: parseInt(groupId),
      });
      res.status(201).json(joinNotification);
    } catch (error) {
      console.error("Error creating join notification:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Delete a join notification
  deleteJoinNotification: async (req, res) => {
    const { id } = req.params;
    try {
      const joinNotification = await JoinNotification.findByPk(id);
      if (!joinNotification) {
        return res.status(404).json({ error: "Join notification not found" });
      }
      await joinNotification.destroy();
      res.json({ message: "Join notification deleted successfully" });
    } catch (error) {
      console.error("Error deleting join notification:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = JoinNotificationController;
