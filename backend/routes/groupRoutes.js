const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const { authJwt } = require("../middleware");
// Routes


/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *           example: "A group for discussing topics related to technology"
 *           description: The description of the group
 *         name:
 *           type: string
 *           example: "Tech Enthusiasts"
 *           description: The name of the group
 *         content:
 *           type: string
 *           example: "Welcome to our tech enthusiasts group! Feel free to share your thoughts and ideas."
 *           description: The content or description of the group
 *       required:
 *         - name
 */


/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Get all groups
 *     description: Returns all groups
 *     responses:
 *       200:
 *         description: Successful operation
 *   post:
 *     summary: Create a new group
 *     description: Create a new group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       201:
 *         description: Group created successfully
 *       500:
 *         description: Internal server error
 *
 * /api/groups/{uuid}:
 *   get:
 *     summary: Get group by ID
 *     description: Returns a group by its UUID
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: UUID of the group to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Group not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update group by ID
 *     description: Update a group by its UUID
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: UUID of the group to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       200:
 *         description: Group updated successfully
 *       404:
 *         description: Group not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete group by ID
 *     description: Delete a group by its UUID
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: UUID of the group to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Group deleted successfully
 *       404:
 *         description: Group not found
 *       500:
 *         description: Internal server error
 */

router.get('/', [authJwt.verifyToken], groupController.getAllGroups);
router.get('/:uuid', [authJwt.verifyToken], groupController.getGroupById);
router.post('/', [authJwt.verifyToken], groupController.createGroup);
router.put('/:uuid', [authJwt.verifyToken], groupController.updateGroup);
router.delete('/:uuid', [authJwt.verifyToken], groupController.deleteGroup);

module.exports = router;
