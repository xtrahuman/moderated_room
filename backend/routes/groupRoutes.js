const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const { authJwt } = require("../middleware");
// Routes
router.get('/',[authJwt.verifyToken], groupController.getAllGroups);
router.get('/:id',[authJwt.verifyToken], groupController.getGroupById);
router.post('/',[authJwt.verifyToken], groupController.createGroup);
router.put('/:id',[authJwt.verifyToken], groupController.updateGroup);
router.delete('/:id',[authJwt.verifyToken], groupController.deleteGroup);

module.exports = router;
