const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController')
const { verifySignUp, authJwt } = require("../middleware");


// Route that requires authentication
router.post('/signin', AuthController.signin);

router.post('/signup', [verifySignUp.checkDuplicateUsernameOrEmail], AuthController.signup);

module.exports = router;