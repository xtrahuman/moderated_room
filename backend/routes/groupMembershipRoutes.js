// routes/groupMembershipRoutes.js
const express = require('express');
const router = express.Router();
const groupMembershipController = require('../controllers/groupMembershipController');
const { authJwt } = require("../middleware");

// Routes
router.get('/',[authJwt.verifyToken], groupMembershipController.getAllGroupMemberships);
router.get('/awaiting',[authJwt.verifyToken], groupMembershipController.getAllAwaitingGroupMemberships);
router.get('/:uuid',[authJwt.verifyToken], groupMembershipController.getGroupMembershipById);
router.put('/:uuid',[authJwt.verifyToken], groupMembershipController.updateGroupMembership);
router.post('/join',[authJwt.verifyToken], groupMembershipController.joinGroupMembership);
router.delete('/:uuid',[authJwt.verifyToken], groupMembershipController.deleteGroupMembership);

module.exports = router;
