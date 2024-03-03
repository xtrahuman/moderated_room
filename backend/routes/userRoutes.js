const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { authJwt } = require("../middleware");

router.get('/',[authJwt.verifyToken],  UserController.getAllUsers);
router.get('/:id',[authJwt.verifyToken],  UserController.getUserById);
router.put('/:id',[authJwt.verifyToken],  UserController.updateUser);
router.delete('/:id',[authJwt.verifyToken],  UserController.deleteUser);


module.exports = router;