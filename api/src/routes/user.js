/*
Objective: Route created for user module
Author: me@ravindernegi.com
*/
const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');
router.get('/', UsersController.getUsers);
router.get('/:id', UsersController.getUserById);
module.exports = router;