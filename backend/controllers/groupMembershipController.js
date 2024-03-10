// controllers/groupMembershipController.js
const { GroupMembership, Group } = require("../models");

const group = require("../models/group");
const GroupMembershipController = {
  getAllGroupMemberships: async (req, res) => {
    try {
      const groupMemberships = await GroupMembership.findAll({
      order: [['createdAt', 'DESC']],
      });
      res.json(groupMemberships);
    } catch (error) {
      console.error("Error fetching groupMemberships:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllAwaitingGroupMemberships: async (req, res) => {
    try {
      // Fetch the user's group memberships where they are admin or moderator
      const userGroupMemberships = await GroupMembership.findAll({
        order: [['createdAt', 'DESC']],
        where: {
          userId: req.userId,
          role: ['admin', 'moderator'] // Fetch only admin or moderator roles
        },
      });

      // Extract group IDs from user's group memberships
      const groupIds = userGroupMemberships.map(membership => membership.groupId);

      // Fetch the group memberships awaiting verification for the user's groups
      const groupMemberships = await GroupMembership.findAll({
        where: {
          groupId: groupIds,
          verifyStatus: "awaiting_verification",
        },
      });
      res.json(groupMemberships);
    } catch (error) {
      console.error("Error fetching groupMemberships:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getGroupMembershipById: async (req, res) => {
    const { uuid } = req.params;
    try {
      const groupMembership = await GroupMembership.findOne({
        where: {
          uuid: uuid,
        },
      });
      if (!groupMembership) {
        return res.status(404).json({ error: "groupMembership not found" });
      }
      console.log(groupMembership);
      res.json(groupMembership);
    } catch (error) {
      console.error("Error fetching groupMembership:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Create a new group membership
   joinGroupMembership: async (req, res) => {
    const { groupId } = req.body;

    try {
      const groupMembership = await GroupMembership.create({
        groupId: parseInt(groupId),
        userId: req.userId,
        verifyStatus: 'awaiting_verification'
      });
      res.status(201).json(groupMembership);
    } catch (error) {
      console.error("Error joining group:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // update groupmembership
  updateGroupMembership: async (req, res) => {
    const { uuid } = req.params;
    const { role, verifyStatus } = req.body;
    try {
      if (req.userId) {
        const groupMembership = await GroupMembership.findOne({
          where: {
            uuid: uuid,
          },
        });
        console.log(groupMembership);
        if (!groupMembership) {
          return res.status(404).json({ error: "GroupMembership not found" });
        }

        const groupMemberModifier = await GroupMembership.findOne({
          where: {
            groupId: groupMembership.groupId,
            userId: req.userId,
          },
        });
        if (
          groupMemberModifier &&
          (groupMemberModifier.role !== "admin" ||
            groupMemberModifier.role !== "moderation")
        ) {
          await groupMembership.update({ role, verifyStatus });
          res.json(groupMembership);
        } else {
          res.status(401).json({ error: "unauthorized" });
        }
      } else {
        res.status(401).json({ error: "unauthorized" });
      }
    } catch (error) {
      console.error("Error updating GroupMembership:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Delete a group membership
  deleteGroupMembership: async (req, res) => {
    const { uuid } = req.params;
    try {
      if (req.userId) {
        const groupMembership = await GroupMembership.findOne({
          where: {
            uuid: uuid,
          },
        });
     
        if (!groupMembership) {
          return res.status(404).json({ error: "GroupMembership not found" });
        }

        const groupMemberModifier = await GroupMembership.findOne({
          where: {
            groupId: groupMembership.groupId,
            userId: req.userId,
          },
        });
        if (
          (groupMemberModifier &&
          (groupMemberModifier.role !== "admin" ||
            groupMemberModifier.role !== "moderation" ) ) || groupMembership.userId === req.userId 
        ){
          await groupMembership.destroy();
          res.json({ message: "Group membership deleted successfully" });
        }
      }
    } catch (error) {
      console.error("Error deleting group membership:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = GroupMembershipController;
