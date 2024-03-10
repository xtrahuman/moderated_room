const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const { authJwt } = require("../middleware");
// Routes
router.get('/',[authJwt.verifyToken], groupController.getAllGroups);
router.get('/:uuid',[authJwt.verifyToken], groupController.getGroupById);
router.post('/',[authJwt.verifyToken], groupController.createGroup);
router.put('/:uuid',[authJwt.verifyToken], groupController.updateGroup);
router.delete('/:uuid',[authJwt.verifyToken], groupController.deleteGroup);

module.exports = router;
