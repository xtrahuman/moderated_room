const { Group } = require("../models");
const { GroupMembership } = require("../models");

// Get all groups
exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.findAll();
    res.json({ groups, user: req.userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get a specific group by ID
exports.getGroupById = async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.id);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new group
exports.createGroup = async (req, res) => {
  try {
    const group = await Group.create(req.body);
    res.status(201).json({ group, user: req.userId });

    // Access userId from req object if available
    const userId = req.userId;
    // If userId is available, create the associated GroupMembership
    if (userId) {
      await GroupMembership.create({
        groupId: group.id,
        userId: userId,
        role: "admin",
        // Other attributes of the GroupMembership model
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update an existing group
exports.updateGroup = async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.id);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    await group.update(req.body);
    res.json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a group
exports.deleteGroup = async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.id);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    await group.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
