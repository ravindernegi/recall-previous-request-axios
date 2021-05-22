/*
Objective: Route created for auth module
Author: me@ravindernegi.com
*/
const express = require('express');
const router = express.Router();
const path = require('path');
const AuthController = require('../controllers/auth');


router.get('/', AuthController.getAuthUser);
router.post('/login', AuthController.login);
router.get('/refresh-token', AuthController.refreshToken);
router.post('/update-profile', AuthController.updateProfile);
module.exports = router;