const express = require('express');
const router = express.Router();

// Controller Import
const userController = require('../controller/userController');

// Middleware Import
const auth = require('../middleware/auth')

// GET Route
router.get('/login', auth.redirectIfLoggedIn, userController.visLoginside);
router.get('/register', auth.redirectIfLoggedIn, userController.visRegistreringsside);

// POST Route
router.post('/login', userController.loginPost);
router.post('/register', userController.registerPost);

// Logout Route
router.get('/logout', userController.logout);

module.exports = router;