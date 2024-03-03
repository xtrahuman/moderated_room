// routes/groupMembershipRoutes.js
const express = require('express');
const router = express.Router();
const groupMembershipController = require('../controllers/groupMembershipController');
const { authJwt } = require("../middleware");

// Routes
router.get('/',[authJwt.verifyToken], groupMembershipController.getAllGroupMemberships);
router.get('/:id',[authJwt.verifyToken], groupMembershipController.getGroupMembershipById);
router.post('/',[authJwt.verifyToken], groupMembershipController.createGroupMembership);
router.delete('/:id',[authJwt.verifyToken], groupMembershipController.deleteGroupMembership);

module.exports = router;
