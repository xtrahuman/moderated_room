const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { authJwt } = require("../middleware");

router.get('/',[authJwt.verifyToken],  UserController.getAllUsers);
router.get('/:uuid',[authJwt.verifyToken],  UserController.getUserById);
router.put('/:uuid',[authJwt.verifyToken],  UserController.updateUser);
router.delete('/:uuid',[authJwt.verifyToken],  UserController.deleteUser);


module.exports = router;