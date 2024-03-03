// controllers/groupMembershipController.js
const { GroupMembership, Group } = require("../models");
const { Model, Sequelize } = require("sequelize");
const group = require("../models/group");
const GroupMembershipController = {
  getAllGroupMemberships: async (req, res) => {
    try {
      const groupMemberships = await GroupMembership.findAll();
      res.json(groupMemberships);
    } catch (error) {
      console.error("Error fetching groupMemberships:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getGroupMembershipById: async (req, res) => {
    const { id } = req.params;
    try {
      const groupMembership = await GroupMembership.findByPk(id);
      if (!groupMembership) {
        return res.status(404).json({ error: "groupMembership not found" });
      }
      res.json(groupMembership);
    } catch (error) {
      console.error("Error fetching groupMembership:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Create a new group membership
  createGroupMembership: async (req, res) => {
    const { groupId, userId, role } = req.body;

    try {
      if (req.userId) {
        console.log(req.userId);
        const groupMember = await GroupMembership.findOne({
          where: {
            groupId: groupId,
            userId: req.userId,
          },
        });
        console.log(groupMember);
        if (
          groupMember &&
          (groupMember.dataValues.role !== "admin" ||
            groupMember.dataValues.role !== "moderation")
        ) {
          const groupMembership = await GroupMembership.create({
            groupId: parseInt(groupId),
            userId: parseInt(userId),
            role: role,
          });
          res.status(201).json(groupMembership);
        } else {
          res.status(401).json({ error: "unauthorized" });
        }
      } else {
        res.status(401).json({ error: "unauthorized" });
      }
    } catch (error) {
      console.error("Error creating group membership:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // update groupmembership
  updateGroupMembership: async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    try {
      const groupMembership = await GroupMembership.findByPk(id);
      if (!groupMembership) {
        return res.status(404).json({ error: "GroupMembership not found" });
      }
      await groupMembership.update({ role });
      res.json(groupMembership);
    } catch (error) {
      console.error("Error updating GroupMembership:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Delete a group membership
  deleteGroupMembership: async (req, res) => {
    const { id } = req.params;
    try {
      const groupMembership = await GroupMembership.findByPk(id);
      if (!groupMembership) {
        return res.status(404).json({ error: "Group membership not found" });
      }
      await groupMembership.destroy();
      res.json({ message: "Group membership deleted successfully" });
    } catch (error) {
      console.error("Error deleting group membership:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = GroupMembershipController;
