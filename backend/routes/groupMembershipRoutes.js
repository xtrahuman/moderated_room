const express = require('express');
const router = express.Router();
const groupMembershipController = require('../controllers/groupMembershipController');
const { authJwt } = require("../middleware");


/**
 * @swagger
 * components:
 *   schemas:
 *     GroupMembership:
 *       type: object
 *       properties:
*               groupId:
*                 type: integer
*                 description: The ID of the group associated with the membership
*               userId:
*                 type: integer
*                 description: The ID of the user associated with the membership
*               role:
*                 type: string
*                 enum: [admin, member, moderator]
*                 description: The role of the user in the group
*               verifyStatus:
*                 type: string
*                 enum: [verified, unverified, awaiting_verification]
*                 description: The verification status of the membership
 *       required:
 *         - groupId
 *         - userId
 *         - role
 *         - verifyStatus
 */

// Routes

/**
 * @swagger
 * /api/group-memberships:
 *   get:
 *     summary: Get all group memberships
 *     description: Returns all group memberships
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GroupMembership'
 */
router.get('/', [authJwt.verifyToken], groupMembershipController.getAllGroupMemberships);

/**
 * @swagger
 * /api/group-memberships/awaiting:
 *   get:
 *     summary: Get all group memberships awaiting verification
 *     description: Returns all group memberships awaiting verification
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GroupMembership'
 */
router.get('/awaiting', [authJwt.verifyToken], groupMembershipController.getAllAwaitingGroupMemberships);

/**
 * @swagger
 * /api/group-memberships/{uuid}:
 *   get:
 *     summary: Get a group membership by ID
 *     description: Returns a group membership by its UUID
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the group membership
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupMembership'
 */
router.get('/:uuid', [authJwt.verifyToken], groupMembershipController.getGroupMembershipById);

/**
 * @swagger
 * /api/group-memberships/{uuid}:
 *   put:
 *     summary: Update a group membership
 *     description: Update a group membership by its UUID(only an admin or moderator can do this)
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the group membership
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupMembership'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupMembership'
 */
router.put('/:uuid', [authJwt.verifyToken], groupMembershipController.updateGroupMembership);

/**
 * @swagger
 * /api/group-memberships/join:
 *   post:
 *     summary: Join a group
 *     description: Create a new group membership to join a group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupId:
 *                 type: integer
 *                 description: The ID of the group associated with the membership
 *               userId:
 *                 type: integer
 *                 description: The ID of the user associated with the membership
 *     responses:
 *       201:
 *         description: Group membership created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupMembership'
 */
router.post('/join', [authJwt.verifyToken], groupMembershipController.joinGroupMembership);

/**
 * @swagger
 * /api/group-memberships/{uuid}:
 *   delete:
 *     summary: Delete a group membership
 *     description: Delete a group membership by its UUID
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the group membership
 *     responses:
 *       200:
 *         description: Group membership deleted successfully
 */
router.delete('/:uuid', [authJwt.verifyToken], groupMembershipController.deleteGroupMembership);

module.exports = router;
