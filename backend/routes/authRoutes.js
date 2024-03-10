const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController')
const { verifySignUp, authJwt } = require("../middleware");


/**
 * @swagger
 * /api/signin:
 *   post:
 *     summary: Sign in to the application
 *     description: Authenticate user credentials and generate an access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully signed in
 *       400:
 *         description: Invalid username or password
 *       500:
 *         description: Internal server error
 */

router.post('/signin', AuthController.signin);

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Sign up for a new account
 *     description: Register a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                  type: string
 *               lastName:
 *                  type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully signed up
 *       400:
 *         description: Username or email already exists
 *       500:
 *         description: Internal server error
 *         
 * security:
 *   - BearerAuth: []
 */

router.post('/signup', [verifySignUp.checkDuplicateUsernameOrEmail], AuthController.signup);

module.exports = router;