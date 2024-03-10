const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { authJwt } = require("../middleware");



/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Returns all users
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.get('/',[authJwt.verifyToken],  UserController.getAllUsers);
/**
 * @swagger
 * /api/users/{uuid}:
 *   get:
 *     summary: Get user by ID
 *     description: Returns a user by their UUID
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: UUID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.get('/:uuid',[authJwt.verifyToken],  UserController.getUserById);

router.put('/:uuid',[authJwt.verifyToken],  UserController.updateUser);

router.delete('/:uuid',[authJwt.verifyToken],  UserController.deleteUser);


module.exports = router;