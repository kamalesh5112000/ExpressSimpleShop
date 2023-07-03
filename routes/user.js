const express = require('express');

const userController = require('../controllers/User');

const router = express.Router();

router.get('/user',userController.getUsers);
router.post('/user',userController.addUser);
router.delete('/user/:ID',userController.userdelete);

module.exports = router;